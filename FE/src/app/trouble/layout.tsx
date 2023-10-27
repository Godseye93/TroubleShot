interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <div className="pt-12 px-2">{children}</div>;
}
