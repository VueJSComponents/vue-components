import { Base64Zip, pathJoin } from 'common-types';
import pako from 'pako';
import { mapGetters } from '../../node_modules/vuex';

export function decompress(fileContents: Base64Zip) {
  if (!fileContents) {
    return '';
  }
  const binaryContent = window.atob(fileContents);
  let expandedContent: string;
  try {
    expandedContent = pako.inflate(binaryContent, { to: 'string' });
    return expandedContent;
  } catch (e) {
    throw new Error('problem-with-decompression');
  }
}

export function absoluteUrl(baseUrl: string, md: string) {
  // tslint:disable-next-line:max-line-length

  console.log(md.replace(/\!\[(.*)\]\((.*)\)/g, '(($2))'));

  return md.replace(
    /\!\[(.*)\]\((.*)\)/g,
    (_, alt, url) => `![${alt}](${pathJoin(baseUrl, url.replace(/^\./, ''))})`
  );
}
