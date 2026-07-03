# Mock database of SEBI Registered Intermediaries for hackathon demo

INTERMEDIARIES = [
    {
        "registration_number": "INZ000203235",
        "name": "Zerodha Broking Limited",
        "type": "Stock Broker",
        "website": "https://zerodha.com",
        "upi_id": "zerodha@hdfcbank",
        "status": "Active",
        "email": "compliance@zerodha.com"
    },
    {
        "registration_number": "INZ000301838",
        "name": "Nextbillion Technology Private Limited (Groww)",
        "type": "Stock Broker",
        "website": "https://groww.in",
        "upi_id": "groww@axisbank",
        "status": "Active",
        "email": "support@groww.in"
    },
    {
        "registration_number": "INZ000161534",
        "name": "Angel One Limited",
        "type": "Stock Broker",
        "website": "https://angelone.in",
        "upi_id": "angelone@icici",
        "status": "Active",
        "email": "compliance@angelone.in"
    },
    {
        "registration_number": "INZ000185137",
        "name": "RKSV Securities India Private Limited (Upstox)",
        "type": "Stock Broker",
        "website": "https://upstox.com",
        "upi_id": "upstox@yesbank",
        "status": "Active",
        "email": "compliance@upstox.com"
    },
    {
        "registration_number": "INZ000183131",
        "name": "ICICI Securities Limited",
        "type": "Stock Broker",
        "website": "https://icicisecurities.com",
        "upi_id": "isec@icici",
        "status": "Active",
        "email": "compliance@icicisecurities.com"
    },
    {
        "registration_number": "INZ000186937",
        "name": "HDFC Securities Limited",
        "type": "Stock Broker",
        "website": "https://hdfcsec.com",
        "upi_id": "hdfcsec@hdfcbank",
        "status": "Active",
        "email": "compliance@hdfcsec.com"
    },
    {
        "registration_number": "INZ000200137",
        "name": "Kotak Securities Limited",
        "type": "Stock Broker",
        "website": "https://kotaksecurities.com",
        "upi_id": "kotaksec@kotak",
        "status": "Active",
        "email": "compliance@kotak.com"
    },
    {
        "registration_number": "INZ000156038",
        "name": "Motilal Oswal Financial Services Limited",
        "type": "Stock Broker",
        "website": "https://motilaloswal.com",
        "upi_id": "motilal@hdfcbank",
        "status": "Active",
        "email": "compliance@motilaloswal.com"
    },
    {
        "registration_number": "INZ000194738",
        "name": "Sharekhan Limited",
        "type": "Stock Broker",
        "website": "https://sharekhan.com",
        "upi_id": "sharekhan@axis",
        "status": "Active",
        "email": "compliance@sharekhan.com"
    },
    {
        "registration_number": "INZ000176937",
        "name": "5paisa Capital Limited",
        "type": "Stock Broker",
        "website": "https://5paisa.com",
        "upi_id": "5paisa@icici",
        "status": "Active",
        "email": "support@5paisa.com"
    },
    # Investment Advisors (RIAs)
    {
        "registration_number": "INA000000094",
        "name": "Nikhil Kamath",
        "type": "Investment Advisor",
        "website": "https://nikhilkamath.com",
        "upi_id": "nikhil.kamath@okaxis",
        "status": "Active",
        "email": "advisory@nikhilkamath.com"
    },
    {
        "registration_number": "INA000016428",
        "name": "Capitalmind Wealth Private Limited",
        "type": "Investment Advisor",
        "website": "https://capitalmindwealth.com",
        "upi_id": "capitalmind@icici",
        "status": "Active",
        "email": "compliance@capitalmind.in"
    },
    {
        "registration_number": "INA200002819",
        "name": "Windmill Capital Private Limited",
        "type": "Investment Advisor",
        "website": "https://windmillcapital.mywealthguide.com",
        "upi_id": "windmill@yesbank",
        "status": "Active",
        "email": "compliance@windmillcapital.co"
    },
    {
        "registration_number": "INA000012111",
        "name": "Abhinav Angirish",
        "type": "Investment Advisor",
        "website": "https://investonline.in",
        "upi_id": "abhinav@investonline",
        "status": "Active",
        "email": "abhinav@investonline.in"
    },
    {
        "registration_number": "INA000006732",
        "name": "Wright Research & Capital Advisory",
        "type": "Investment Advisor",
        "website": "https://wrightresearch.in",
        "upi_id": "wrightresearch@icici",
        "status": "Active",
        "email": "sonam@wrightresearch.in"
    },
    {
        "registration_number": "INA000015509",
        "name": "MarketsMojo Professional Research Private Limited",
        "type": "Investment Advisor",
        "website": "https://marketsmojo.com",
        "upi_id": "marketsmojo@axis",
        "status": "Active",
        "email": "compliance@marketsmojo.com"
    },
    {
        "registration_number": "INA000011500",
        "name": "Scripbox Advisory Services Private Limited",
        "type": "Investment Advisor",
        "website": "https://scripbox.com",
        "upi_id": "scripbox@hdfc",
        "status": "Active",
        "email": "compliance@scripbox.com"
    },
    # Suspended / Investigated Advisors for UI Testing
    {
        "registration_number": "INA000099999",
        "name": "Guaranteed Returns Advisory (Fake Advisor)",
        "type": "Investment Advisor",
        "website": "https://guaranteedwealthreturns.com",
        "upi_id": "getrichquick@ybl",
        "status": "Suspended",
        "email": "cheat@guaranteedwealthreturns.com"
    },
    {
        "registration_number": "INH000007823",
        "name": "Capital Growth Research & Advisory",
        "type": "Research Analyst",
        "website": "https://capitalgrowthadvisory.in",
        "upi_id": "capitalgrowth@okaxis",
        "status": "Suspended",
        "email": "suspended_advisory@gmail.com"
    },
    {
        "registration_number": "INP000005432",
        "name": "Secure Wealth Portfolio Managers",
        "type": "Portfolio Manager",
        "website": "https://securewealthpm.com",
        "upi_id": "securewealth@icici",
        "status": "Under Investigation",
        "email": "compliance@securewealthpm.com"
    },
    # More Real / Fake-Lookalike Advisors
    {
        "registration_number": "INH000001234",
        "name": "Akshat Shrivastava Financials",
        "type": "Research Analyst",
        "website": "https://akshatshrivastava.in",
        "upi_id": "akshat@okicici",
        "status": "Active",
        "email": "contact@akshatshrivastava.in"
    },
    {
        "registration_number": "INH000004567",
        "name": "Pranjal Kamra Finology",
        "type": "Research Analyst",
        "website": "https://finology.in",
        "upi_id": "pranjal@finology",
        "status": "Active",
        "email": "support@finology.in"
    },
    {
        "registration_number": "INH200007328",
        "name": "Rachana Ranade Financial Academy",
        "type": "Research Analyst",
        "website": "https://ca-rachana-ranade.com",
        "upi_id": "rachanaranade@icici",
        "status": "Active",
        "email": "compliance@rachanaranade.com"
    },
    {
        "registration_number": "INA000013579",
        "name": "Basentool Investment Advisory",
        "type": "Investment Advisor",
        "website": "https://basanttools.com",
        "upi_id": "basant@hdfcbank",
        "status": "Active",
        "email": "basant@basanttools.com"
    },
    {
        "registration_number": "INA000008642",
        "name": "Nifty Rangers Wealth Advisory",
        "type": "Investment Advisor",
        "website": "https://niftyrangers.com",
        "upi_id": "niftyrangers@ybl",
        "status": "Active",
        "email": "rangers@niftyrangers.com"
    },
    {
        "registration_number": "INP000001111",
        "name": "Quantum Portfolio Managers",
        "type": "Portfolio Manager",
        "website": "https://quantumamc.com",
        "upi_id": "quantum@axis",
        "status": "Active",
        "email": "info@quantumamc.com"
    },
    {
        "registration_number": "INP000002222",
        "name": "ASK Investment Managers Limited",
        "type": "Portfolio Manager",
        "website": "https://askfinancials.com",
        "upi_id": "askinv@icici",
        "status": "Active",
        "email": "compliance@askinv.com"
    },
    {
        "registration_number": "INP000003333",
        "name": "WhiteOak Capital Management",
        "type": "Portfolio Manager",
        "website": "https://whiteoakindia.com",
        "upi_id": "whiteoak@hdfc",
        "status": "Active",
        "email": "compliance@whiteoakindia.com"
    },
    {
        "registration_number": "INH000009911",
        "name": "Value Research Analysts Private Limited",
        "type": "Research Analyst",
        "website": "https://valueresearchonline.com",
        "upi_id": "valueresearch@sbi",
        "status": "Active",
        "email": "info@valueresearch.com"
    },
    {
        "registration_number": "INA000011223",
        "name": "Kuvera Wealth Advisors",
        "type": "Investment Advisor",
        "website": "https://kuvera.in",
        "upi_id": "kuvera@axisbank",
        "status": "Active",
        "email": "support@kuvera.in"
    },
    {
        "registration_number": "INA000044556",
        "name": "ET Money Wealth Advisors",
        "type": "Investment Advisor",
        "website": "https://etmoney.com",
        "upi_id": "etmoney@icici",
        "status": "Active",
        "email": "support@etmoney.com"
    },
    {
        "registration_number": "INA000077889",
        "name": "Paytm Money Investment Advisory",
        "type": "Investment Advisor",
        "website": "https://paytmmoney.com",
        "upi_id": "paytmmoney@paytm",
        "status": "Active",
        "email": "compliance@paytmmoney.com"
    },
    {
        "registration_number": "INH000005555",
        "name": "Motley Fool India Research Analysts",
        "type": "Research Analyst",
        "website": "https://fool.in",
        "upi_id": "motleyfool@okicici",
        "status": "Active",
        "email": "compliance@fool.in"
    },
    {
        "registration_number": "INZ000100200",
        "name": "Navia Markets Limited (Tradeplus)",
        "type": "Stock Broker",
        "website": "https://tradeplusonline.com",
        "upi_id": "tradeplus@yesbank",
        "status": "Active",
        "email": "compliance@tradeplusonline.com"
    },
    {
        "registration_number": "INZ000300400",
        "name": "Dhan (Moneylicious Securities Private Limited)",
        "type": "Stock Broker",
        "website": "https://dhan.co",
        "upi_id": "dhan@axisbank",
        "status": "Active",
        "email": "compliance@dhan.co"
    },
    {
        "registration_number": "INA000010099",
        "name": "RupeeVest Investment Advisors",
        "type": "Investment Advisor",
        "website": "https://rupeevest.com",
        "upi_id": "rupeevest@hdfc",
        "status": "Active",
        "email": "compliance@rupeevest.com"
    },
    {
        "registration_number": "INA000001991",
        "name": "Pattabiraman (FreeFincal Advisory)",
        "type": "Investment Advisor",
        "website": "https://freefincal.com",
        "upi_id": "pattu@okaxis",
        "status": "Active",
        "email": "pattu@freefincal.com"
    },
    {
        "registration_number": "INH000008899",
        "name": "Equitymaster Research Analysts",
        "type": "Research Analyst",
        "website": "https://equitymaster.com",
        "upi_id": "equitymaster@hdfcbank",
        "status": "Active",
        "email": "compliance@equitymaster.com"
    },
    {
        "registration_number": "INZ000456123",
        "name": "Fyers Securities Private Limited",
        "type": "Stock Broker",
        "website": "https://fyers.in",
        "upi_id": "fyers@yesbank",
        "status": "Active",
        "email": "compliance@fyers.in"
    },
    {
        "registration_number": "INZ000789456",
        "name": "Alice Blue Financial Services",
        "type": "Stock Broker",
        "website": "https://aliceblueonline.com",
        "upi_id": "aliceblue@icici",
        "status": "Active",
        "email": "compliance@aliceblueonline.com"
    },
    {
        "registration_number": "INA000005511",
        "name": "Orowealth Investment Advisors",
        "type": "Investment Advisor",
        "website": "https://orowealth.com",
        "upi_id": "orowealth@axis",
        "status": "Active",
        "email": "support@orowealth.com"
    },
    {
        "registration_number": "INA000012300",
        "name": "Prime Investor Advisory Services",
        "type": "Investment Advisor",
        "website": "https://primeinvestor.in",
        "upi_id": "primeinvestor@hdfc",
        "status": "Active",
        "email": "contact@primeinvestor.in"
    },
    {
        "registration_number": "INP000007788",
        "name": "Abakkus Asset Manager LLP",
        "type": "Portfolio Manager",
        "website": "https://abakkusinvest.com",
        "upi_id": "abakkus@icici",
        "status": "Active",
        "email": "compliance@abakkusinvest.com"
    },
    {
        "registration_number": "INP000009900",
        "name": "Helios Capital Management Private Limited",
        "type": "Portfolio Manager",
        "website": "https://helioscapital.in",
        "upi_id": "helios@yesbank",
        "status": "Active",
        "email": "compliance@helioscapital.in"
    },
    {
        "registration_number": "INH000010101",
        "name": "Teji Mandi Research Analyst (TM Investment)",
        "type": "Research Analyst",
        "website": "https://tejimandi.com",
        "upi_id": "tejimandi@icici",
        "status": "Active",
        "email": "support@tejimandi.com"
    },
    {
        "registration_number": "INA000014234",
        "name": "Finvasia Investment Advisory",
        "type": "Investment Advisor",
        "website": "https://shooonya.com",
        "upi_id": "shoonya@axis",
        "status": "Active",
        "email": "compliance@finvasia.com"
    },
    {
        "registration_number": "INZ000001000",
        "name": "Choice Equity Broking Private Limited",
        "type": "Stock Broker",
        "website": "https://choiceindia.com",
        "upi_id": "choice@sbi",
        "status": "Active",
        "email": "compliance@choiceindia.com"
    },
    {
        "registration_number": "INH000006600",
        "name": "Nifty Strategies Advisors",
        "type": "Research Analyst",
        "website": "https://niftystrategies.co.in",
        "upi_id": "niftystrategies@okaxis",
        "status": "Suspended",
        "email": "complaints@niftystrategies.co.in"
    }
]
