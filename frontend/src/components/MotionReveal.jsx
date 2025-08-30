import { motion } from 'framer-motion'

const MotionReveal = motion.create(({ children, delay = 0 }) => {
  const reduce = useReducedMotion()
  const variants = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
})

export default MotionReveal
