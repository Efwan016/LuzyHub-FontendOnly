import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sportsApi } from "../services/api";
import Autendticated from "../layout/Autenticated";
import Head from "../component/Head";

interface Match {
    id: string;
    title: string;
    timestamp: number;
    status: string;
    status_detail: string;
    home_team_logo?: string;
    away_team_logo?: string;
}

interface League {
    id?: string;
    name?: string;
    logo?: string;
    matches: Match[];
}

export default function LiveFootball() {

    const [liveLeagues, setLiveLeagues] = useState<League[]>([]);
    const [upcomingLeagues, setUpcomingLeagues] = useState<League[]>([]);
    const [activeTab, setActiveTab] = useState<'live' | 'upcoming'>('live');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMatches = async () => {
            try {
                const [liveData, upcomingData] = await Promise.all([
                    sportsApi.getLiveMatches(),
                    sportsApi.getUpcomingMatches()
                ]);

                const live = (liveData.data || []) as League[];
                const upcoming = (upcomingData.data || []) as League[];

                setLiveLeagues(live);
                setUpcomingLeagues(upcoming);
            } catch (err) {
                console.error("Failed to load matches:", err);
            } finally {
                setLoading(false);
            }
        };

        loadMatches();
    }, []);

    if (loading) {
        return <div className="p-6 text-white">Loading matches...</div>;
    }

    const leagues = activeTab === 'live' ? liveLeagues : upcomingLeagues;

    return (
        <Autendticated>
            <Head title="Live Football Matches" />
            <div className="p-6 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <h1 className="text-2xl font-bold">Football Matches</h1>

                    <div className="flex bg-[#1F1F1F] p-1 rounded-lg self-start sm:self-auto">
                        <button
                            onClick={() => setActiveTab('live')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'live' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Live Now
                        </button>
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'upcoming' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Upcoming
                        </button>
                    </div>
                </div>

                {leagues.length === 0 && (
                    <div className="text-gray-400 text-center py-10">No {activeTab} matches found right now</div>
                )}

                <div className="flex flex-col gap-8">
                    {leagues.map((league) => (
                        <div key={league.id || Math.random().toString()} className="rounded-xl overflow-hidden">
                            <div className="flex items-center gap-3 mb-4 px-2 border-b border-[#1F1F1F] pb-2">
                                {league.logo && (
                                    <img
                                        src={league.logo}
                                        alt={league.name}
                                        className="w-8 h-8 object-contain bg-white rounded-full p-1"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                    />
                                )}
                                <h2 className="text-xl font-bold text-gray-100">{league.name || "League"}</h2>
                            </div>
                            <div className="grid gap-4">
                                {league.matches && league.matches.map((match) => {

                                    const teams = match.title?.split(" vs ") || [];
                                    const home = teams[0] || "Home";
                                    const away = teams[1] || "Away";

                                    const date = new Date(match.timestamp);
                                    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                                    const homeLogo = match.home_team_logo;
                                    const awayLogo = match.away_team_logo;

                                    return (
                                        <Link
                                            key={match.id}
                                            to={`/sports/match/${match.id}`}
                                            className="bg-[#1F1F1F] p-4 rounded-lg flex items-center justify-between hover:bg-[#2a2a2a] transition-colors"
                                        >

                                            <div className="w-1/3 font-semibold flex items-center gap-3">
                                                {homeLogo && (
                                                    <img
                                                        src={homeLogo}
                                                        alt={home}
                                                        className="w-8 h-8 rounded-full object-cover bg-gray-800"
                                                    />
                                                )}
                                                <span className="truncate hidden sm:inline">{home}</span>
                                                <span className="truncate sm:hidden">{home.substring(0, 3).toUpperCase()}</span>
                                            </div>

                                            <div className="text-center w-1/3">
                                                <div className="text-red-400 text-sm font-bold">
                                                    {match.status_detail || match.status}
                                                </div>

                                                <div className="text-xs text-gray-400 mt-1">
                                                    {time}
                                                </div>
                                            </div>

                                            <div className="w-1/3 text-right font-semibold flex items-center justify-end gap-3">
                                                <span className="truncate hidden sm:inline">{away}</span>
                                                <span className="truncate sm:hidden">{away.substring(0, 3).toUpperCase()}</span>
                                                {awayLogo && (
                                                    <img
                                                        src={awayLogo}
                                                        alt={away}
                                                        className="w-8 h-8 rounded-full object-cover bg-gray-800"
                                                    />
                                                )}
                                            </div>

                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Autendticated>
    );
}