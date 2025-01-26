import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

export async function extractID3v1(fileUri: string) {
    const fileData = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
    });
    alert("l")
    const buffer = Buffer.from(fileData, "base64");

    // Check for the "TAG" identifier (ID3v1)
    if (
        buffer.toString("ascii", buffer.length - 128, buffer.length - 125) !==
        "TAG"
    ) {
        throw new Error("No ID3v1 metadata found.");
    }

    return {
        title: buffer
            .toString("ascii", buffer.length - 125, buffer.length - 95)
            .trim(),
        artist: buffer
            .toString("ascii", buffer.length - 95, buffer.length - 65)
            .trim(),
        album: buffer
            .toString("ascii", buffer.length - 65, buffer.length - 35)
            .trim(),
        year: buffer
            .toString("ascii", buffer.length - 35, buffer.length - 31)
            .trim(),
    };
}
