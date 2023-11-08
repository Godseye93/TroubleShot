interface Props {
  params: {
    user: string;
  };
}

export default function Page({ params }: Props) {
  return <div className="mt-20 fcc w-full">this is mypage {params.user}</div>;
}
