/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from 'react';
export default function SafeImage({ src, alt = '', category, avatar = false, ...props }) {
  const [failed, setFailed] = useState('');
  const local = category ? `/images/${(category === 'Power' ? 'electronics' : category.toLowerCase())}.jpg` : '/images/placeholder.svg';
  const original = typeof src === 'string' && (src.startsWith('/images/') || /^https?:\/\//.test(src)) && !src.includes('googleusercontent.com/aida/') ? src : (avatar ? '/images/avatar.svg' : local);
  const actual = failed === original ? (avatar ? '/images/avatar.svg' : '/images/placeholder.svg') : original;
  return <img {...props} src={actual} alt={alt} referrerPolicy="no-referrer" onError={() => setFailed(original)} />;
}
