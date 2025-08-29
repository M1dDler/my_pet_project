import type { CoinSummary } from "types/types";

interface Props {
    coinsSummaries: CoinSummary[];
}

export default function AssetsTable({ coinsSummaries }: Props) {
    return (
        <div className="relative shadow-md sm:rounded-lg">
            <div className="w-full overflow-x-auto">
                <div className="mb-4">
                    <span className="font-semibold text-white text-xl">Assets</span>
                </div>
                <table className="w-full min-w-[0px] text-left text-gray-500 text-sm rtl:text-right dark:text-gray-400">
                    <thead className="bg-gray-50 text-gray-700 text-xs uppercase dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">1h %</th>
                            <th className="px-6 py-3">24h %</th>
                            <th className="hidden px-6 py-3 md:table-cell">7d %</th>
                            <th className="px-6 py-3">Assets</th>
                            <th className="hidden px-6 py-3 md:table-cell">Avg. Purchase Price</th>
                            <th className="px-6 py-3">Profit / Loss</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coinsSummaries.map((coin) => {
                            const profitLoss = Number(coin.profitLoss);
                            const avgBuy = Number(coin.avgBuy);
                            const currentPrice = Number(coin.currentPricePerUnit);
                            const quantity = Number(coin.quantity);

                            const profitColor = profitLoss >= 0 ? "text-green-600" : "text-red-600";
                            const changeColor = (val: number) => (val >= 0 ? "text-green-600" : "text-red-600");

                            return (
                                <tr key={coin.coinName} className="border-gray-700 border-b bg-gray-800">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{coin.coinName}</td>
                                    <td className="px-6 py-4">${currentPrice.toLocaleString()}</td>
                                    <td className={`px-6 py-4 font-semibold ${changeColor(coin.profitChangePercentage1h)}`}>
                                        {coin.profitChangePercentage1h.toFixed(2)}%
                                    </td>
                                    <td className={`px-6 py-4 font-semibold ${changeColor(coin.profitChangePercentage24h)}`}>
                                        {coin.profitChangePercentage24h.toFixed(2)}%
                                    </td>
                                    <td className={`hidden px-6 py-4 font-semibold md:table-cell ${changeColor(coin.profitChangePercentage7d)}`}>
                                        {coin.profitChangePercentage7d.toFixed(2)}%
                                    </td>
                                    <td className="px-6 py-4">{quantity}</td>
                                    <td className="hidden px-6 py-4 md:table-cell">${avgBuy.toLocaleString()}</td>
                                    <td className={`px-6 py-4 font-semibold ${profitColor}`}>${profitLoss.toFixed(2).toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <button className="font-medium text-blue-600 hover:underline dark:text-blue-500" type="button">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
