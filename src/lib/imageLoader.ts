// https://stackoverflow.com/questions/70457750/nextjs-not-fetching-images-using-image-url-after-deploying-on-production-server/71377671#71377671
export default function loaderProps({ src }: { src: string }) {
  return src;
}
