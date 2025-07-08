import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
    return (
        <div className="hidden h-full w-80 flex-col overflow-hidden bg-[#1a1a1a] p-5 text-white md:flex">
            
            <div className="mb-6 flex items-center justify-between">
                <h2 className="font-semibold text-lg">My portfolios</h2>
                <PencilIcon className="h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-200" />
            </div>

            
            <div className="mb-6 flex items-center gap-4 rounded-lg bg-gray-700 bg-opacity-40 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        viewBox="0 0 24 24"
                        className="h-6 w-6"
                        role="img"
                        aria-labelledby="iconTitle"
                    >
                        <title id="iconTitle">User icon</title>
                        <path d="M12 2C10 2 8.5 4 8.5 6S10 10 12 10 15.5 8 15.5 6 14 2 12 2zm0 12c-2 0-6 1-6 4v2h12v-2c0-3-4-4-6-4z" />
                    </svg>

                </div>
                <div>
                    <div className="font-semibold text-white">MyPortfolio</div>
                    <div className="text-gray-300 text-xs">USD 2,726,240.42</div>
                </div>
            </div>

            <button
                type="button"
                className="flex items-center gap-2 font-medium text-gray-400 hover:underline"
            >
                <PlusIcon className="h-5 w-5" />
                <span>Create new portfolio</span>
            </button>
        </div>
    );
}
