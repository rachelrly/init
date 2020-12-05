/*This utility function transforms images to binary*/
export function buffTo64(buffer) {

  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (var i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  };

  return window.btoa(binary);
}