import { generatePdf } from '../actions';
import { blobToBase64, streamToBlob } from "@/shared/lib";
import { ENV_VARIABLES } from "@/shared/configs";

jest.mock('@/shared/lib', () => ({
  blobToBase64: jest.fn(),
  streamToBlob: jest.fn(),
}));

jest.mock('@/shared/configs', () => ({
  ENV_VARIABLES: {
    API_LINK: 'https://api.example.com',
    API_KEY: 'test-api-key',
  },
}));

global.fetch = jest.fn();

describe('generatePdf', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should convert text to PDF successfully', async () => {
    const mockText = 'Test text to convert to PDF';
    const mockPdfBlob = new Blob(['mock pdf content'], { type: 'application/pdf' });
    const mockBase64 = 'data:application/pdf;base64,bW9jayBwZGYgY29udGVudA==';
    
    const mockResponse = {
      ok: true,
      body: 'mock-stream' as unknown as ReadableStream<Uint8Array>,
      json: jest.fn(),
    };
    
    (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);
    (streamToBlob as jest.Mock).mockResolvedValueOnce(mockPdfBlob);
    (blobToBase64 as jest.Mock).mockResolvedValueOnce(mockBase64);

    const result = await generatePdf(mockText);

    expect(global.fetch).toHaveBeenCalledWith(
      `${ENV_VARIABLES.API_LINK}/create-pdf?apiKey=${ENV_VARIABLES.API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: mockText }),
      }
    );
    expect(streamToBlob).toHaveBeenCalledWith(mockResponse.body);
    expect(blobToBase64).toHaveBeenCalledWith(mockPdfBlob);
    expect(result).toBe(mockBase64);
  });

  it('should throw an error when API request fails', async () => {
    const mockText = 'Test text to convert to PDF';
    const errorMessage = 'API Error';
    
    const mockErrorResponse = {
      ok: false,
      json: jest.fn().mockResolvedValueOnce({ message: errorMessage }),
    };
    
    (global.fetch as jest.Mock).mockResolvedValueOnce(mockErrorResponse);

    await expect(generatePdf(mockText)).rejects.toThrow(errorMessage);

    expect(global.fetch).toHaveBeenCalledWith(
      `${ENV_VARIABLES.API_LINK}/create-pdf?apiKey=${ENV_VARIABLES.API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: mockText }),
      }
    );
  });
});
