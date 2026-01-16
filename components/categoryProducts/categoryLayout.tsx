type Props = {
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
  children: React.ReactNode;
};

export default function CategoryLayout({ sidebar, topbar, children }: Props) {
  return (
    <div className="min-h-screen">
      <div className="w-11/12 mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {sidebar}
          <div className="flex-1">
            {topbar}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
