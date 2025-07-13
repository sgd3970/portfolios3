'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2, User, Mail, Phone, Building, MessageSquare } from 'lucide-react'
import { Button } from '../UI/Button'
import { Card } from '../UI/Card'
import { cn } from '@/lib/utils'

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  icon?: React.ReactNode
  validation?: {
    pattern?: RegExp
    minLength?: number
    maxLength?: number
    message?: string
  }
}

interface ContactFormProps {
  className?: string
  title?: string
  description?: string
  fields?: FormField[]
  submitText?: string
  successMessage?: string
  errorMessage?: string
  animated?: boolean
  showIcons?: boolean
  variant?: 'default' | 'minimal' | 'card' | 'floating'
  onSubmit?: (data: FormData) => Promise<void> | void
  onSuccess?: (data: FormData) => void
  onError?: (error: string) => void
}

interface FormData {
  [key: string]: string | boolean
}

interface FormErrors {
  [key: string]: string
}

const defaultFields: FormField[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
    required: true,
    icon: <User className="w-4 h-4" />,
    validation: {
      minLength: 2,
      message: 'Name must be at least 2 characters'
    }
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email address',
    required: true,
    icon: <Mail className="w-4 h-4" />,
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    }
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: 'Enter your phone number',
    required: false,
    icon: <Phone className="w-4 h-4" />,
    validation: {
      pattern: /^[\+]?[1-9][\d]{0,15}$/,
      message: 'Please enter a valid phone number'
    }
  },
  {
    name: 'company',
    label: 'Company',
    type: 'text',
    placeholder: 'Enter your company name',
    required: false,
    icon: <Building className="w-4 h-4" />
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'Enter your message here...',
    required: true,
    icon: <MessageSquare className="w-4 h-4" />,
    validation: {
      minLength: 10,
      message: 'Message must be at least 10 characters'
    }
  }
]

export default function ContactForm({
  className,
  title = 'Get In Touch',
  description = 'Have a project in mind? Let\'s discuss how we can work together.',
  fields = defaultFields,
  submitText = 'Send Message',
  successMessage = 'Thank you for your message! We\'ll get back to you soon.',
  errorMessage = 'Sorry, there was an error sending your message. Please try again.',
  animated = true,
  showIcons = true,
  variant = 'default',
  onSubmit,
  onSuccess,
  onError
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({})
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})
  const formRef = useRef<HTMLFormElement>(null)

  const validateField = (field: FormField, value: string): string | null => {
    if (field.required && !value.trim()) {
      return `${field.label} is required`
    }

    if (field.validation) {
      const { pattern, minLength, maxLength, message } = field.validation

      if (pattern && !pattern.test(value)) {
        return message || `${field.label} format is invalid`
      }

      if (minLength && value.length < minLength) {
        return message || `${field.label} must be at least ${minLength} characters`
      }

      if (maxLength && value.length > maxLength) {
        return message || `${field.label} must be no more than ${maxLength} characters`
      }
    }

    return null
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    fields.forEach(field => {
      const value = formData[field.name] as string || ''
      const error = validateField(field, value)
      
      if (error) {
        newErrors[field.name] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleInputBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    
    const field = fields.find(f => f.name === name)
    if (field) {
      const value = formData[name] as string || ''
      const error = validateField(field, value)
      
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Default form submission (you might want to implement your own logic)
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      setSubmitStatus('success')
      onSuccess?.(formData)
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({})
        setTouched({})
        setSubmitStatus('idle')
      }, 3000)
      
    } catch (error) {
      setSubmitStatus('error')
      onError?.(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'minimal':
        return 'space-y-4'
      case 'card':
        return 'bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-6 space-y-4'
      case 'floating':
        return 'bg-white dark:bg-neutral-900 rounded-lg shadow-xl p-6 space-y-4 backdrop-blur-sm'
      default:
        return 'space-y-4'
    }
  }

  const renderField = (field: FormField) => {
    const value = formData[field.name] as string || ''
    const error = errors[field.name]
    const isTouched = touched[field.name]
    const hasError = error && isTouched

    const inputClasses = cn(
      'w-full px-4 py-3 border rounded-lg transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500',
      'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
      'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white',
      hasError
        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
        : 'border-neutral-300 dark:border-neutral-600',
      showIcons && field.icon && 'pl-12'
    )

    return (
      <motion.div
        key={field.name}
        initial={animated ? { opacity: 0, y: 20 } : undefined}
        animate={animated ? { opacity: 1, y: 0 } : undefined}
        transition={animated ? { duration: 0.5 } : undefined}
        className="relative"
      >
        <label
          htmlFor={field.name}
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
        >
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <div className="relative">
          {showIcons && field.icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
              {field.icon}
            </div>
          )}

          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={value}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              onBlur={() => handleInputBlur(field.name)}
              placeholder={field.placeholder}
              className={cn(inputClasses, 'min-h-[120px] resize-y')}
              rows={5}
            />
          ) : field.type === 'select' ? (
            <select
              id={field.name}
              name={field.name}
              value={value}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              onBlur={() => handleInputBlur(field.name)}
              className={inputClasses}
            >
              <option value="">{field.placeholder || `Select ${field.label}`}</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={value}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              onBlur={() => handleInputBlur(field.name)}
              placeholder={field.placeholder}
              className={inputClasses}
            />
          )}
        </div>

        <AnimatePresence>
          {hasError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center mt-2 text-red-500 text-sm"
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  return (
    <Card className={cn(getVariantClasses(), className)}>
      {(title || description) && (
        <motion.div
          initial={animated ? { opacity: 0, y: 20 } : undefined}
          animate={animated ? { opacity: 1, y: 0 } : undefined}
          transition={animated ? { duration: 0.5 } : undefined}
          className="text-center mb-6"
        >
          {title && (
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-neutral-600 dark:text-neutral-400">
              {description}
            </p>
          )}
        </motion.div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {fields.map(renderField)}

        <motion.div
          initial={animated ? { opacity: 0, y: 20 } : undefined}
          animate={animated ? { opacity: 1, y: 0 } : undefined}
          transition={animated ? { duration: 0.5, delay: 0.3 } : undefined}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 text-base font-medium"
            variant={submitStatus === 'success' ? 'creative' : 'primary'}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : submitStatus === 'success' ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Message Sent!
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {submitText}
              </>
            )}
          </Button>
        </motion.div>
      </form>

      {/* Status Messages */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
          >
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
              <p className="text-green-800 dark:text-green-300 text-sm">
                {successMessage}
              </p>
            </div>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
              <p className="text-red-800 dark:text-red-300 text-sm">
                {errorMessage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export type { ContactFormProps, FormField, FormData, FormErrors } 