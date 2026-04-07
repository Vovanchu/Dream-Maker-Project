const en = {
  site: {
    name: "Dream Fulfiller",
    badge: "Charity Platform",
    copyright: "All rights reserved.",
    madeWith: "Made with",
    inUkraine: "in Ukraine",
  },
  nav: {
    howItWorks: "How It Works",
    dreamCatalog: "Dream Catalog",
    addDream: "Add Dream",
    statistics: "Statistics",
    login: "Sign In",
    logout: "Sign Out",
    register: "Sign Up",
    navigation: "Navigation",
    account: "Account",
    resetPassword: "Reset Password",
    myDreams: "Dreams",
  },
  hero: {
    title: "Fulfill someone's dream today",
    description:
      "We connect people who need help with those willing to give it. Every dream can become reality with your support.",
    viewDreams: "Browse Dreams",
    addDream: "Add Dream",
    dreamsCompleted: "Dreams fulfilled",
    donors: "Donors",
    cities: "Cities of Ukraine",
  },
  how: {
    title: "How It Works",
    subtitle: "Four simple steps from submitting a dream to making it real",
    step1: {
      title: "Submit a Dream",
      desc: "Fill out the form with the dream description and information about the person in need.",
    },
    step2: {
      title: "Moderation",
      desc: "Our team reviews each application and contacts the person for confirmation.",
    },
    step3: {
      title: "Fundraising",
      desc: "Donors choose dreams and help financially or with resources.",
    },
    step4: {
      title: "Fulfillment",
      desc: "The dream comes true, and we publish a report for transparency.",
    },
  },
  stats: {
    title: "Our Results",
    subtitle: "Together we are changing lives for the better every day",
    dreams: "Dreams fulfilled",
    dreamsDesc: "Real dreams fulfilled since launch",
    donors: "Donors",
    donorsDesc: "People joined the platform",
    cities: "Cities",
    citiesDesc: "Across all of Ukraine",
    raised: "UAH raised",
    raisedDesc: "Total donations amount",
  },
  cta: {
    title: "Ready to fulfill someone's dream?",
    description:
      "Every contribution, regardless of size, brings someone closer to their dream. Join the community of donors today.",
    viewDreams: "Browse Dreams",
    register: "Sign Up",
  },
  dreams: {
    title: "Dream Catalog",
    subtitle: "Choose a dream you want to help fulfill",
    searchPlaceholder: "Search by name, city or description...",
    category: "Category",
    format: "Format",
    all: "All",
    budget: "Budget",
    currency: "UAH",
    found: "Dreams found",
    notFound: "No dreams found",
    notFoundDesc: "Try changing search filters",
    fulfill: "Fulfill Dream",
    yearsShort: "y.o.",
  },
  cat: {
    child: "Child",
    elderly: "Elderly",
    veteran: "Veteran",
    disabled: "Person with disability",
  },
  fmt: { online: "Online", offline: "Offline" },

  forms: {
    labels: {
      name: "Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      age: "Age",
      city: "City",

      dreamTitle: "Dream Title",
      dreamDescription: "Detailed Description",
      dreamDeadline: "Dream Deadline",

      category: "Category",
      format: "Format",
      budget: "Amount",

      personInfo: "Person Information",
      dreamInfo: "Dream Description",
      formatCategory: "Format and Category",
      budgetSection: "Budget",
      contactPhone: "Contact Phone",

      image: {
        title: "Dream photo (optional)",
        noFile: "No file selected",
        instruction: "Drag a photo or select files",
        formats: "PNG, JPG, WEBP · up to 5 MB",
        added: "Photo added",
      },
    },

    placeholders: {
      name: "Your name",
      email: "Enter email: example@gmail.com",
      password: "Enter password",
      confirmPassword: "Repeat password",
      age: "For example, 8",
      city: "For example, Kyiv",
      dreamTitle: "Short dream title",
      dreamDescription:
        "Describe the dream in more detail and why it is important...",
      budget: "Enter the dream budget",
      donationAmount: "Enter amount",
      category: "Select a category",
      format: "Select execution format",
      contactPhone: "Enter phone number: +380XXXXXXXXX",
      dreamDeadline: "Select dream deadline",

      imageUrl: "Enter image URL",
    },

    buttons: {
      submit: "Submit",
      submitting: "Submitting...",
      cancel: "Cancel",
      back: "Back home",
      close: "Close",
      login: "Log in",
      register: "Register",
      make: "Make a dream",
    },
  },

  validation: {
    requiredEmail: "Email is required",
    invalidEmail: "Invalid email format",
    requiredPassword: "Password is required",
    minPassword: "Minimum 8 characters",
    passwordUppercase: "One uppercase letter",
    passwordLowercase: "One lowercase letter",
    passwordDigit: "One digit",
    passwordNoMatch: "Passwords do not match",
    passwordMatch: "Passwords match",

    invalidName: "Invalid name",
    requiredName: "Name is required",
    requiredCity: "City is required",

    invalidAge: "Invalid age",
    maxAge: "Age must be less than 120",

    shortTitle: "Title is too short",
    shortDescription: "Description is too short",

    invalidBudget: "Budget must be a number",
    maxBudget: "Budget cannot exceed 10,000",

    requiredPhone: "Phone number is required",
    invalidPhone: "Invalid phone number",
    requiredDeadline: "Dream deadline is required",
    requiredPersonType: "Person type is required",

    invalidUrl: "Invalid image url",
  },

  feedback: {
    success: {
      dreamSubmitted: "Dream submitted successfully!",
      accountCreated: "Account created!",
      emailSent: "Email sent!",
      donation: "Thank you for your generosity!",
    },
    info: {
      dreamModeration:
        "Thank you for your submission. Our team will review your application within 24 hours.",
      resetInstructions: "We sent password reset instructions to",
      confirmEmail: "We sent a confirmation email to",
      checkInbox: "Check your inbox.",
    },
    errors: {
      somethingWrong: "Something went wrong",
      userNotFound: "No account found with this email",
      wrongPassword: "Incorrect password",
      invalidCredentials: "Invalid email or password",
      emailUsed: "Email already in use",
    },
  },
  modals: {
    donation: {
      collected: "Collected",
      of: "of",
      remaining: "Remaining to collect",
      support: "Support Dream",
    },
    success: {
      addAnother: "Add another dream",
      toCatalog: "To dream catalog",
      toLogin: "Go to Sign In",
      toHome: "To homepage",
    },
  },
  pages: {
    addDream: {
      pageTitle: "Add a New Dream",
      pageSubtitle: "Fill out the form below to submit a dream for moderation",
      summary: "Submitted dream summary",
      personInfo: "Person information",
      dreamInfo: "Dream description",
      formatCategory: "Format and category",
      budgetSection: "Budget",
      formatRequired: "Fulfillment format *",
      categoryRequired: "Category *",
      budgetRequired: "Required amount",
      successMessage: "Dream submitted successfully!",
    },
    login: {
      title: "Sign In",
      subtitle: "Sign in to your account",
      forgotPassword: "Forgot password?",
      showPassword: "Show password",
      hidePassword: "Hide password",
      loading: "Signing in...",
      or: "or",
      google: "Sign in with Google",
      noAccount: "Don't have an account?",
      register: "Sign Up",
    },
    register: {
      title: "Sign Up",
      subtitle: "Create an account on the platform",
      loading: "Registering...",
      hasAccount: "Already have an account?",
      login: "Sign In",
      personType: "Select person type",
    },
    reset: {
      title: "Reset Password",
      subtitle: "Enter your email and we'll send recovery instructions",
      loading: "Sending...",
      backToLogin: "Back to Sign In",
      sendAgain: "Send again",
    },
    googleAuth: {
      title: "Google Authentication",
      description:
        "This feature is currently under development. Soon you will be able to sign in using your Google account.",
      progress:
        "We are working to make authentication faster and more convenient.",
      back: "Back to Login",
    },
  },
  categories: {
    child: "Child",
    elderly: "Elderly person",
    veteran: "Veteran",
    disabled: "Person with disability",
  },
  theme: {
    light: "Light",
    dark: "Dark",
    system: "System",
    toggle: "Toggle theme",
  },
  lang: { label: "Language" },
  misc: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
  },
};
export default en;
