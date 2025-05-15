import { ForgeAIResponse } from './interfaces';

/**
 * Scrolls an element smoothly to the top
 * @param element The element to scroll
 */
export const scrollToTop = (element: HTMLElement | null): void => {
  if (!element) return;
  element.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * Copies the email content to clipboard while properly formatting HTML content
 * @param aiResponse The AI response containing subject and body
 * @param setCopied Callback function to update the copied state
 * @returns void
 */
export const handleCopy = (
  aiResponse: ForgeAIResponse | null,
  setCopied: (value: boolean) => void
): void => {
  if (!aiResponse) return;

  // Strip HTML and format text
  const formattedText = aiResponse.body
    .replace(/<p.*?>/gi, '')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<br.*?>/gi, '\n')
    .replace(/<div.*?>/gi, '')
    .replace(/<\/div>/gi, '\n')
    .replace(/<li.*?>/gi, '• ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<.*?>/g, '');

  // Clean up extra newlines
  const cleanText = formattedText
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();

  // Combine subject and body
  const combinedText = `${aiResponse.subject}\n\n${cleanText}`;

  // Copy to clipboard and handle UI feedback
  navigator.clipboard.writeText(combinedText).then(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  });
}; 