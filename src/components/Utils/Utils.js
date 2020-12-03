import React from 'react'

export function buffTo64(buffer) {
  // console.log('BUFFER FUNCTION RAN')
  // console.log('buffer', buffer)
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (var i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}