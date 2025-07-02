'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Shield, 
  AlertTriangle, 
  Zap, 
  Lock, 
  KeyRound,
  CheckCircle,
  Clock,
  ArrowRight,
  Trophy,
  Twitter
} from 'lucide-react'

interface LearningModule {
  id: string
  title: string
  description: string
  url: string
  icon: React.ReactNode
  featured?: boolean
  completed: boolean
}

const Dashboard: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set())

  const modules: LearningModule[] = [
    {
      id: 'clob-explainer',
      title: 'CLOB Explainer',
      description: 'Explore order book fundamentals and trading mechanics',
      url: 'https://clob-explainer.vercel.app/',
      icon: <BookOpen className="w-6 h-6" />,
      completed: false
    },
    {
      id: 'custodial-risk-demo',
      title: 'Custodial Risk',
      description: 'Explore Security vulnerabilities in centralized systems',
      url: 'https://custodial-risk.vercel.app/',
      icon: <Shield className="w-5 h-5" />,
      completed: false
    },
    {
      id: 'order-censorship',
      title: 'Order Censorship and Escape Hatch',
      description: 'Exploring limitations and manipulation in centralized exchanges',
      url: 'https://order-censorship-escape-hatch.vercel.app/',
      icon: <AlertTriangle className="w-5 h-5" />,
      completed: false
    },
    {
      id: 'sequencer-role',
      title: 'Sequencer Simulator',
      description: 'Learn reordering, front-running, and sandwich attack mechanisms',
      url: 'https://sequencer-role.vercel.app/',
      icon: <Zap className="w-5 h-5" />,
      completed: false
    },
    {
      id: 'soft-hard-finality',
      title: 'Finality States',
      description: 'Transaction Finality levels',
      url: 'https://transaction-finalities.vercel.app/',
      icon: <Lock className="w-5 h-5" />,
      completed: false
    },
    {
      id: 'zk-clob',
      title: 'ZK-CLOB',
      description: 'Basic understanding of CLOBS ON BLOBS',
      url: 'https://zk-clobs.vercel.app/',
      icon: <KeyRound className="w-6 h-6" />,
      featured: true,
      completed: false
    }
  ]

  const handleModuleClick = (url: string, moduleId: string) => {
    window.open(url, '_blank')
    setCompletedModules(prev => new Set(prev).add(moduleId))
  }

  const foundationModule = modules[0]
  const intermediateModules = modules.slice(1)
  const progressPercentage = (completedModules.size / modules.length) * 100

  // Fixed Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const featuredCardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      rotateY: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Pink Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-fuchsia-600" />

      {/* Header */}
      <motion.header 
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-zinc-900">Learning Hub</h1>
                <p className="text-sm text-zinc-500">Concepts made Simple</p>
              </div>
            </motion.div>

            {/* Progress & User */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <span className="text-sm text-zinc-600">
                  {completedModules.size}/{modules.length} Complete
                </span>
                <div className="w-24 h-2 bg-zinc-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-fuchsia-500 to-pink-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="bg-fuchsia-500 text-white border-fuchsia-500 hover:bg-fuchsia-600 hover:border-fuchsia-600"
              >
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-6 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Hero Section */}
          <motion.section variants={cardVariants} className="text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900">
                CLOBS ON BLOBS
              </h1>
              <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
                Hands on experience of CLOBS, Problems with CEX, Centralized Sequencers and Basic Understanding of CLOBS ON BLOBS
              </p>
            </div>
            
            {completedModules.size === 0 ? (
              <div className="flex items-center justify-center space-x-2 text-zinc-500">
                <Clock className="w-5 h-5" />
                <span>Journey Not Started</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-fuchsia-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">
                  {completedModules.size} of {modules.length} modules completed
                </span>
              </div>
            )}
          </motion.section>

          {/* Foundation Section */}
          <motion.section variants={cardVariants} className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-zinc-900">🎯 Learn about CLOBS</h2>
              <p className="text-zinc-600 max-w-2xl mx-auto">
                Explore CLOB Fundamentals
              </p>
            </div>

            <div className="flex justify-center">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredCard(foundationModule.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="w-full max-w-lg"
              >
                <Card className="border-2 border-fuchsia-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-fuchsia-50 rounded-xl">
                        {foundationModule.icon}
                      </div>
                      {completedModules.has(foundationModule.id) && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-zinc-900">
                        {foundationModule.title}
                      </CardTitle>
                      <CardDescription className="mt-2 text-base text-zinc-600">
                        {foundationModule.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => handleModuleClick(foundationModule.url, foundationModule.id)}
                      className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 text-white"
                      size="lg"
                    >
                      Explore
                      <motion.div
                        animate={{ x: hoveredCard === foundationModule.id ? 4 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </motion.div>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.section>

          {/* Intermediate & Advanced Section */}
          <motion.section variants={cardVariants} className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-zinc-900">🚀 Learn More</h2>
              <p className="text-zinc-600 max-w-2xl mx-auto">
                Explore by Playing User, Sequencer and Learn about CLOBS ON BLOBS
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Small Cards Grid */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {intermediateModules.filter(module => !module.featured).map((module, index) => (
                    <motion.div
                      key={module.id}
                      variants={cardVariants}
                      whileHover="hover"
                      onHoverStart={() => setHoveredCard(module.id)}
                      onHoverEnd={() => setHoveredCard(null)}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        className="h-full cursor-pointer group border-zinc-200 hover:border-fuchsia-300 bg-white hover:shadow-lg transition-all duration-300"
                        onClick={() => handleModuleClick(module.url, module.id)}
                      >
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="p-2 bg-zinc-50 group-hover:bg-fuchsia-50 rounded-lg transition-colors duration-300">
                              {module.icon}
                            </div>
                            {completedModules.has(module.id) && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          <CardTitle className="text-lg text-zinc-900">
                            {module.title}
                          </CardTitle>
                          <CardDescription className="text-sm text-zinc-600 line-clamp-2">
                            {module.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Featured Card - ZK-CLOB */}
              <div className="lg:col-span-1">
                <AnimatePresence>
                  {intermediateModules.filter(module => module.featured).map((module) => (
                    <motion.div
                      key={module.id}
                      variants={featuredCardVariants}
                      whileHover="hover"
                      onHoverStart={() => setHoveredCard(module.id)}
                      onHoverEnd={() => setHoveredCard(null)}
                      className="sticky top-28"
                    >
                      <Card className="relative overflow-hidden border-2 border-fuchsia-300 bg-gradient-to-br from-white to-fuchsia-50 cursor-pointer group shadow-lg hover:shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-pink-500/5" />
                        
                        <CardHeader className="relative space-y-4 pb-4">
                          <div className="p-4 bg-gradient-to-br from-fuchsia-100 to-pink-100 rounded-xl w-fit">
                            {module.icon}
                          </div>
                          <div>
                            <CardTitle className="text-2xl text-zinc-900 mb-2">
                              {module.title}
                            </CardTitle>
                            <CardDescription className="text-base text-zinc-600">
                              {module.description}
                            </CardDescription>
                          </div>
                        </CardHeader>

                        <CardContent className="relative space-y-6">
                          <div className="space-y-3">
                            <div className="flex items-center text-sm text-zinc-600">
                              <KeyRound className="w-4 h-4 mr-2 text-fuchsia-500" />
                              Privacy-Preserving Trading
                            </div>
                            <div className="flex items-center text-sm text-zinc-600">
                              <Shield className="w-4 h-4 mr-2 text-fuchsia-500" />
                              Zero-Knowledge Proofs
                            </div>
                            <div className="flex items-center text-sm text-zinc-600">
                              <Zap className="w-4 h-4 mr-2 text-fuchsia-500" />
                              Reordering, Front running Protection
                            </div>
                          </div>

                          <Button 
                            onClick={() => handleModuleClick(module.url, module.id)}
                            className="w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 text-white shadow-lg"
                            size="lg"
                          >
                            Explore
                            <motion.div
                              animate={{ x: hoveredCard === module.id ? 4 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </motion.div>
                          </Button>

                          {completedModules.has(module.id) && (
                            <div className="flex items-center justify-center text-green-600">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Completed
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </main>

      {/* Simplified Footer - Only Socials */}
      <footer className="bg-zinc-900 text-white">
        <div className="h-1 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-fuchsia-600" />
        <div className="container mx-auto px-6 py-12">
          <div className="text-center space-y-6">
            <h3 className="text-xl font-semibold">Connect with me</h3>
            <div className="flex items-center justify-center space-x-8">
              <a 
                href="https://x.com/defi_not_defry" target="_blank"
                className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors group"
              >
                <Twitter className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                <span>Twitter / X</span>
              </a>
            </div>
          </div>
          
          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-sm text-zinc-400">
            <p>&copy; 2025 Learning Hub. Learn by experiencing</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard
