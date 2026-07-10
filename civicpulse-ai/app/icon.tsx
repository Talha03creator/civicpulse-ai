import { ImageResponse } from 'next/og';
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C9.92487 2 5 6.92487 5 13C5 21.5 16 30 16 30C16 30 27 21.5 27 13C27 6.92487 22.0751 2 16 2Z" fill="#4F46E5" fillOpacity="0.2" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 17C18.2091 17 20 15.2091 20 13C20 10.7909 18.2091 9 16 9C13.7909 9 12 10.7909 12 13C12 15.2091 13.7909 17 16 17Z" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 13H13L14.5 9L17.5 17L19 13H23" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
