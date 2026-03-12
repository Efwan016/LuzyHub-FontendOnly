import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sportsApi } from './api';
import { FaFutbol, FaRegClock } from 'react-icons/fa';
import { GiWhistle } from 'react-icons/gi';

// Asumsi struktur data dari API (Anda bisa menyesuaikannya)
interface Team {
    id: number;
    name: string;
    logo: string;
}

interface MatchEvent {
    time: { elapsed: number };
    team: { id: number };
    player: { name: string };
    type: 'Goal' | 'Card';
    detail: string;
}

interface MatchDetailData {
    fixture: {
        id: number;
        date: string;
        status: { long: string; short: string; elapsed: number };
    };
    league: { name: string; round: string };
    teams: { home: Team; away: Team };
    goals: { home: number | null; away: number | null };
    events: MatchEvent[];
}


const MatchDetailSkeleton = () => (
    <div className="animate-pulse">
        <div className="bg-gray-800/50 rounded-lg p-4 md:p-6 mb-6">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-center gap-2 w-1/3">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-700 rounded-full"></div>
                    <div className="h-6 w-32 bg-gray-700 rounded"></div>
                </div>
                <div className="text-center">
                    <div className="h-10 w-24 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-20 bg-gray-700 rounded"></div>
                </div>
                <div className="flex flex-col items-center gap-2 w-1/3">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-700 rounded-full"></div>
                    <div className="h-6 w-32 bg-gray-700 rounded"></div>
                </div>
            </div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 md:p-6">
            <div className="h-8 w-40 bg-gray-700 rounded mb-4"></div>
            <div className="space-y-4">
                <div className="h-12 bg-gray-700 rounded"></div>
                <div className="h-12 bg-gray-700 rounded"></div>
                <div className="h-12 bg-gray-700 rounded"></div>
            </div>
        </div>
    </div>
);

export default function MatchDetail() {
    const { id } = useParams<{ id: string }>();
    const [match, setMatch] = useState<MatchDetailData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMatchDetail = async () => {
            if (!id) {
                setError("Match ID not found.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                // 2. Ganti mock data dengan panggilan API asli
                const response = await sportsApi.getMatchDetail(id);
                const data = Array.isArray(response.data) ? response.data[0] : response.data;
                setMatch(data); // Asumsi data ada di dalam properti 'data'
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch match details.");
                console.error(err);
                setLoading(false);
            }
        };

        fetchMatchDetail();
    }, [id]);

    const renderEvent = (event: MatchEvent, homeTeamId: number | undefined) => {
        if (homeTeamId === undefined) return null;
        const isHomeEvent = event.team.id === homeTeamId;
        const Icon = event.type === 'Goal' ? FaFutbol : () => <div className={`w-2 h-3 ${event.detail === 'Yellow Card' ? 'bg-yellow-400' : 'bg-red-600'}`}></div>;

        const eventContent = (
            <div className={`flex items-center gap-3 ${isHomeEvent ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="text-amber-500"><Icon /></div>
                <div className="font-semibold">{event.player.name}</div>
                {event.type === 'Goal' && <div className="text-xs text-gray-400">({event.detail})</div>}
            </div>
        );

        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between"
                    key={`${event.time.elapsed}-${event.player.name}`}
                >
                    <div className={`w-5/12 ${isHomeEvent ? 'text-left' : 'text-right'}`}>
                        {isHomeEvent && eventContent}
                    </div>
                    <div className="w-2/12 flex justify-center">
                        <div className="bg-gray-700 text-white text-xs font-bold rounded-full h-8 w-8 flex items-center justify-center">
                            {event.time.elapsed}'
                        </div>
                    </div>
                    <div className={`w-5/12 ${!isHomeEvent ? 'text-left' : 'text-right'}`}>
                        {!isHomeEvent && eventContent}
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    };

    if (loading) {
        return (
            <div className="bg-[#0a0a0a] text-white min-h-screen p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <MatchDetailSkeleton />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#0a0a0a] text-white min-h-screen flex items-center justify-center">
                <div className="text-center p-8 bg-gray-800/50 rounded-lg">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!match) {
        return null;
    }

    const { fixture, league, teams, goals, events } = match;

    return (
        <div className="bg-[#0a0a0a] text-white min-h-screen p-4 md:p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                {/* Scoreboard */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-gray-800/70 to-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl p-4 md:p-6 mb-6 border border-gray-700"
                >
                    <div className="text-center text-sm text-gray-400 mb-4">
                        {league?.name} - {league?.round}
                    </div>
                    <div className="flex justify-around items-center">
                        <div className="flex flex-col items-center gap-3 w-1/3 text-center">
                            <img src={teams?.home?.logo} alt={teams?.home?.name} className="w-16 h-16 md:w-24 md:h-24 object-contain" />
                            <h2 className="font-bold text-base md:text-xl">{teams?.home?.name}</h2>
                        </div>

                        <div className="text-center">
                            {fixture?.status?.short === 'FT' ? (
                                <div className="text-4xl md:text-6xl font-bold tracking-tight">
                                    {goals?.home ?? 0} - {goals?.away ?? 0}
                                </div>
                            ) : (
                                <div className="text-4xl md:text-6xl font-bold tracking-tight text-amber-500">
                                    {goals?.home ?? 0} - {goals?.away ?? 0}
                                </div>
                            )}
                            <div className={`mt-2 text-xs font-semibold uppercase px-2 py-1 rounded ${fixture?.status?.short === 'LIVE' ? 'bg-red-600 animate-pulse' : 'bg-gray-600'}`}>
                                {fixture?.status?.short === 'LIVE' ? `${fixture?.status?.elapsed}'` : fixture?.status?.short}
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3 w-1/3 text-center">
                            <img src={teams?.away?.logo} alt={teams?.away?.name} className="w-16 h-16 md:w-24 md:h-24 object-contain" />
                            <h2 className="font-bold text-base md:text-xl">{teams?.away?.name}</h2>
                        </div>
                    </div>
                </motion.div>

                {/* Match Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-gray-800/50 rounded-xl shadow-lg p-4 md:p-6 border border-gray-700/50"
                >
                    <h3 className="text-xl font-bold text-amber-500 mb-6 border-b-2 border-amber-500/30 pb-2">
                        Match Summary
                    </h3>

                    <div className="relative space-y-6 before:content-[''] before:absolute before:top-0 before:left-1/2 before:-ml-[1px] before:h-full before:w-[2px] before:bg-gray-700">
                        <div className="flex items-center justify-center">
                            <div className="bg-gray-700 text-white text-xs font-bold rounded-full h-8 w-8 flex items-center justify-center">
                                <GiWhistle />
                            </div>
                        </div>

                        {events && events
                            .slice()
                            .sort((a, b) => a.time.elapsed - b.time.elapsed)
                            .map((event) => renderEvent(event, teams?.home?.id))}

                        {fixture?.status?.short === 'FT' && (
                            <div className="flex items-center justify-center">
                                <div className="bg-gray-700 text-white text-xs font-bold rounded-full h-8 w-8 flex items-center justify-center">
                                    <GiWhistle />
                                </div>
                            </div>
                        )}
                    </div>

                    {(!events || events.length === 0) && fixture?.status?.short !== 'NS' && (
                         <div className="text-center text-gray-400 py-8">
                            No major events in the first half.
                         </div>
                    )}

                    {fixture?.status?.short === 'NS' && (
                        <div className="text-center text-gray-400 py-8">
                            <FaRegClock className="mx-auto text-4xl mb-4" />
                            <p>Match has not started yet.</p>
                            <p className="text-sm">{fixture?.date ? new Date(fixture.date).toLocaleString() : ''}</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}