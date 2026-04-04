import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, Shield, Globe } from 'lucide-react'

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-accent-primary/20 blur-[150px] pointer-events-none rounded-full" />
            <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-accent-vibrant/10 blur-[150px] pointer-events-none rounded-full" />

            {/* Navigation Placeholder */}
            <nav className="p-8 flex justify-between items-center relative z-10 max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                    <span className="w-8 h-8 bg-gradient-to-tr from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center text-white">D</span>
                    DevLink
                </h1>
                <div className="flex gap-4">
                    <button className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">Login</button>
                    <button className="btn-primary text-sm">Join the Community</button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-8 pt-32 pb-20 relative z-10">
                <div className="max-w-4xl text-center mx-auto space-y-8">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-display font-bold leading-tight"
                    >
                        Your Portfolio, <br />
                        <span className="gradient-text">Engineered</span> for Impact.
                    </motion.h2>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-foreground/60 max-w-2xl mx-auto"
                    >
                        Design a presence that mirrors the quality of your code. Simple setups for high-performing developers. 
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button className="btn-primary py-4 px-10 text-lg shadow-2xl hover:scale-105">Get Free Access</button>
                        <button className="glass-card py-4 px-10 border-white/20 hover:bg-white/10 transition-colors">How it works</button>
                    </motion.div>
                </div>

                {/* Features Grid Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40">
                    <FeatureCard
                        icon={<Rocket className="w-6 h-6 text-accent-primary" />}
                        title="Instant Publishing"
                        desc="One-click deployment for your professional profile."
                    />
                    <FeatureCard
                        icon={<Shield className="w-6 h-6 text-accent-secondary" />}
                        title="Security First"
                        desc="Safe handling of your sensitive project links."
                    />
                    <FeatureCard
                        icon={<Globe className="w-6 h-6 text-accent-vibrant" />}
                        title="Global Insights"
                        desc="Real-time analytics on profile engagement."
                    />
                </div>
            </main>
        </div>
    )
}

const FeatureCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <motion.div 
        whileHover={{ y: -10 }}
        className="glass-card p-8 border-white/5 bg-white/[0.02]"
    >
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-foreground/50 leading-relaxed text-sm">{desc}</p>
    </motion.div>
)

export default LandingPage
