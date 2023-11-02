"use client";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  return (
    <div className="">
      Error: {error.message}
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
