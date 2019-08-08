// modified from: https://github.com/threepointone/glam/blob/master/src/hash.js
/* eslint-disable no-plusplus,no-bitwise,no-plusplus,no-param-reassign */

const UInt32 = (str, pos) => (
  str.charCodeAt(pos++)
  + (str.charCodeAt(pos++) << 8)
  + (str.charCodeAt(pos++) << 16)
  + (str.charCodeAt(pos) << 24)
);
const UInt16 = (str, pos) => str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8);
const Umul32 = (n, m) => {
  n |= 0;
  m |= 0;
  const nlo = n & 0xffff;
  const nhi = n >>> 16;
  return (nlo * m + (((nhi * m) & 0xffff) << 16)) | 0;
};

const murmur2 = (str, seed) => {
  const m = 0x5bd1e995;
  const r = 24;
  let h = seed ^ str.length;
  let { length } = str;
  let currentIndex = 0;

  while (length >= 4) {
    let k = UInt32(str, currentIndex);

    k = Umul32(k, m);
    k ^= k >>> r;
    k = Umul32(k, m);

    h = Umul32(h, m);
    h ^= k;

    currentIndex += 4;
    length -= 4;
  }

  // eslint-disable-next-line default-case
  switch (length) {
    case 3:
      h ^= UInt16(str, currentIndex);
      h ^= str.charCodeAt(currentIndex + 2) << 16;
      h = Umul32(h, m);
      break;

    case 2:
      h ^= UInt16(str, currentIndex);
      h = Umul32(h, m);
      break;

    case 1:
      h ^= str.charCodeAt(currentIndex);
      h = Umul32(h, m);
      break;
  }

  h ^= h >>> 13;
  h = Umul32(h, m);
  h ^= h >>> 15;

  return h >>> 0;
};

export default str => murmur2(str, str.length).toString(36);
