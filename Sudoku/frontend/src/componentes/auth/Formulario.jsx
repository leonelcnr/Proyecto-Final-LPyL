// components/auth/AuthLayout.tsx

const AuthLayout = ({ children }) => {
    return (
        <div className="h-full flex items-center justify-center bg-black-800 ">
            <div className="w-full h-auto max-w-md flex flex-col items-center justify-center p-6 bg-black/50 rounded-xl shadow-lg">
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;

