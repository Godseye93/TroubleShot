interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <div className=" mb-10  mt-28">{children}</div>;
}
