import { surpriseMePrompts } from '../constants'
import FileSaver from 'file-saver';

export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random()* surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];

    if(randomPrompt === prompt) return getRandomPrompt(prompt);
    return randomPrompt;
}

export async function downloadImage(photo) {
    // Generate a random number between 1000 and 9999
    const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    try {
        // Fetch the image from the URL
        const response = await fetch(photo);
        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
        const blob = await response.blob(); // Create a blob from the response

        // Use FileSaver to save the blob as an image file
        FileSaver.saveAs(blob, `download-${randomNumber}.jpg`);
    } catch (error) {
        console.error('There was an issue downloading the image:', error);
    }
}