import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sportsApi } from './api';
import Authenticated from '../layout/Autenticated';

interface Team {
    id: number;
    name: string;
    logo: string;
}

interface MatchDetailData {
    fixture: {
        id: number;
        date: number;
        status: { long: string; short: string; elapsed: number };
    };
    league: { name: string; round: string };
    teams: { home: Team; away: Team };
    goals: { home: number | null; away: number | null };
    stream_url?: string;
}

export default function MatchDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

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
                const response = await sportsApi.getMatchDetail(id);
                const raw = Array.isArray(response.data) ? response.data[0] : response.data;

                const src = raw?.sources?.[0];
                const [homeName, awayName] =
                    raw?.match_info?.title?.split(" vs ") || ["Team A", "Team B"];

                const mapped = {
                    stream_url: src?.embedUrl || null,

                    teams: {
                        home: {
                            id: 1,
                            name: homeName,
                            logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(homeName)}`
                        },
                        away: {
                            id: 2,
                            name: awayName,
                            logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(awayName)}`
                        }
                    },

                    goals: {
                        home: 0,
                        away: 0
                    },

                    fixture: {
                        id: raw?.match_info?.id,
                        date: raw?.match_info?.timestamp,
                        status: {
                            short:
                                raw?.match_info?.status === "inprogress"
                                    ? "LIVE"
                                    : raw?.match_info?.status === "notstarted"
                                        ? "NS"
                                        : raw?.match_info?.status,
                            long: raw?.match_info?.status_detail,
                            elapsed: raw?.match_info?.status_detail
                        }
                    },

                    league: {
                        name: raw?.info?.venue?.stadium || "Unknown Stadium",
                        round: raw?.info?.venue?.city || "-"
                    }
                };

                setMatch(mapped);
            } catch (err) {
                setError("Failed to fetch match details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMatchDetail();
    }, [id]);

    if (loading) return <div className="text-white p-6">Loading...</div>;
    if (error) return <div className="text-red-500 p-6">{error}</div>;
    if (!match) return null;

    const { fixture, league, teams, stream_url } = match;

    return (
        <Authenticated>
            <div className="bg-[#0a0a0a] text-white min-h-screen p-4 md:p-8">
                <div className="max-w-4xl mx-auto">

                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 px-4 py-2 bg-gray-700 rounded-lg hover:bg-red-600 transition-colors text-white font-semibold"
                    >
                        ← Back
                    </button>

                    {/* STREAM */}
                    {stream_url ? (
                        <div className="w-full aspect-video mb-6 rounded-xl overflow-hidden bg-black">
                            <iframe
                                src={stream_url}
                                width="100%"
                                height="100%"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        fixture.status.short !== 'LIVE' && (
                            <div className="w-full aspect-video mb-6 flex items-center justify-center bg-gray-900 text-gray-400 rounded-xl">
                                Match belum dimulai
                            </div>
                        )
                    )}

                    {/* SCOREBOARD */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-800 p-6 rounded-xl"
                    >
                        <div className="text-center text-sm text-gray-400 mb-4">
                            {league.name} - {league.round}
                        </div>

                        <div className="flex justify-between items-center">

                            <div className="text-center">
                                <img src={teams.home.logo} className="w-16 rounded-full mx-auto" />
                                <p>{teams.home.name}</p>
                            </div>

                            <div className="text-center">
                                <div className={`px-3 py-1 rounded ${
                                    fixture.status.short === 'LIVE'
                                        ? 'bg-red-600 animate-pulse'
                                        : 'bg-gray-600'
                                }`}>
                                    {fixture.status.short}
                                </div>

                                <div className="text-xs mt-2 text-gray-400">
                                    {new Date(fixture.date).toLocaleString()}
                                </div>
                            </div>

                            <div className="text-center">
                                <img src={teams.away.logo} className="w-16 rounded-full mx-auto" />
                                <p>{teams.away.name}</p>
                            </div>

                        </div>
                    </motion.div>

                </div>
            </div>
        </Authenticated>
    );
}