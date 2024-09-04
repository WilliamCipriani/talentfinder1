

export default function Layout({ children}) {
    return (
        <div className="flex flex-col min-h-screen mx-20">
            <main className="flex-grow">
                {children}
            </main>
        </div>
    );
}
