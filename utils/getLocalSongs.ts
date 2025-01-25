import * as MediaLibrary from "expo-media-library";

export async function getLocalSongs() {
  // Request permissions to access media
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission to access media library was denied.");
  }

  // Fetch audio files from storage
  const media = await MediaLibrary.getAssetsAsync({
    mediaType: MediaLibrary.MediaType.audio,
    first: 50, // Adjust the number of files to fetch
  });

  // Map the results to a useful format
  return media.assets.map((asset) => {
    return {
    id: asset.id,
    uri: asset.uri,
    filename: asset.filename,
    duration: asset.duration, // Duration in seconds
  }});
}
