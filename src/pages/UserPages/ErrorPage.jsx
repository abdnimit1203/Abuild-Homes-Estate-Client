import { Link, useNavigate } from "react-router-dom";


const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col justify-center min-h-screen items-center md:gap-6 gap-4 text-center p-10 ">
            <img src="/assets/other/error.png" alt="error 404"  className="w-[80%] md:max-w-md mx-auto"/>
            <h2 className="text-secondary font-bold md:text-6xl text-3xl">404</h2>
            <h2 className="text-primary font-bold md:text-2xl">Opps!! Something went wrong</h2>
       
            <p className="text-secondary font-semibold md:text-xl">The page you are looking for is not available</p>
            <div className="space-x-4">
                <Link onClick={() => navigate(-1)} className="btn btn-secondary text-white uppercase">
                Go back
                </Link>
                <Link to={'/'} className="px-4 py-3 button button-2 rounded-xl text-sm">
                Return Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;