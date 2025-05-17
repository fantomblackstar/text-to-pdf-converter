import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { TextConverter } from "../text-converter";
import { useGeneratePDFMutation } from "../../api/generate-pdf-mutation";
import { useConvertingHistory } from "@/entities/pdfFile";

jest.mock("../../api/generate-pdf-mutation", () => ({
  useGeneratePDFMutation: jest.fn(),
}));

jest.mock("@/entities/pdfFile", () => ({
  useConvertingHistory: jest.fn(),
}));

jest.mock("@/features/text-input", () => ({
  TextInput: ({
    onTextChange,
    text,
  }: {
    onTextChange: (value: string) => void;
    text: string;
  }) => (
    <textarea
      data-testid="text-input"
      value={text}
      onChange={(e) => onTextChange(e.target.value)}
    />
  ),
}));

jest.mock("@/features/pdf-preview", () => ({
  PdfPreview: ({ pdfDoc }: { pdfDoc: string }) => (
    <div data-testid="pdf-preview">{pdfDoc}</div>
  ),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("TextConverter", () => {
  const mockMutate = jest.fn();
  const mockSaveFile = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useGeneratePDFMutation as jest.Mock).mockReturnValue({
      data: null,
      isPending: false,
      mutate: mockMutate,
    });

    (useConvertingHistory as jest.Mock).mockReturnValue({
      saveFile: mockSaveFile,
    });
  });

  it("renders the component correctly", () => {
    render(<TextConverter />);

    expect(screen.getByTestId("text-input")).toBeTruthy();
    expect(screen.getByText("Конвертувати в PDF")).toBeTruthy();
    expect(screen.queryByTestId("pdf-preview")).toBeFalsy();
  });

  it("disables the convert button when text is empty", () => {
    render(<TextConverter />);

    const button = screen.getByText("Конвертувати в PDF") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it("enables the convert button when text is entered", () => {
    render(<TextConverter />);

    const textInput = screen.getByTestId("text-input");
    fireEvent.change(textInput, { target: { value: "Sample text" } });

    const button = screen.getByText("Конвертувати в PDF") as HTMLButtonElement;
    expect(button.disabled).toBe(false);
  });

  it("calls mutate with text when convert button is clicked", () => {
    render(<TextConverter />);

    const textInput = screen.getByTestId("text-input");
    fireEvent.change(textInput, { target: { value: "Sample text" } });

    const button = screen.getByText("Конвертувати в PDF");
    fireEvent.click(button);

    expect(mockMutate).toHaveBeenCalledWith("Sample text");
  });

  it("shows PDF preview when data is available", () => {
    (useGeneratePDFMutation as jest.Mock).mockReturnValue({
      data: "base64-pdf-data",
      isPending: false,
      mutate: mockMutate,
    });

    render(<TextConverter />);

    expect(screen.getByTestId("pdf-preview")).toBeTruthy();
    expect(screen.getByText("Ваш файл доступний до перегляду:")).toBeTruthy();
  });

  it("handles successful conversion correctly", () => {
    let onSuccessCallback: (pdfFile: string) => void = () => {};

    (useGeneratePDFMutation as jest.Mock).mockImplementation((options) => {
      onSuccessCallback = options.onSuccess;
      return {
        data: null,
        isPending: false,
        mutate: mockMutate,
      };
    });

    render(<TextConverter />);

    const textInput = screen.getByTestId("text-input");
    fireEvent.change(textInput, { target: { value: "Sample text" } });

    act(() => {
      onSuccessCallback("base64-pdf-data");
    });

    expect(mockSaveFile).toHaveBeenCalledWith("base64-pdf-data", "Sample text");
  });
});
