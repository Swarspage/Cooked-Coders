import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const WorkerRegistration = () => {
  const navigate = useNavigate();

  // Stepper and voice states
  const [currentStep, setCurrentStep] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const [healthVoiceMode, setHealthVoiceMode] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [extractedKeywords, setExtractedKeywords] = useState([]);
  const [showKeywordAnalysis, setShowKeywordAnalysis] = useState(false);
  const recognitionRef = useRef(null);

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
    permanentAddress: "",
    currentAddress: "",
    idProofType: "",
    idProofNumber: "",
    idDocument: null,

    // Health Info
    bloodGroup: "",
    height: "",
    weight: "",
    knownAllergies: "",
    chronicConditions: "",
    currentMedications: "",
    vaccinationHistory: "",
    emergencyMedicalInfo: "",

    // Employment
    employerName: "",
    jobCategory: "",
    workLocation: "",
    supervisorContact: "",
  });

  const steps = [
    { number: 1, label: "Personal Info" },
    { number: 2, label: "Health Info" },
    { number: 3, label: "Review" },
  ];

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((s) => s + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    setFormData((prev) => ({
      ...prev,
      idDocument: file || null,
    }));
  };

  // Multilingual Health Keywords Database
  const healthKeywordsDB = {
    english: {
      symptoms: [
        "fever",
        "headache",
        "nausea",
        "vomiting",
        "diarrhea",
        "constipation",
        "cough",
        "cold",
        "sore throat",
        "runny nose",
        "body ache",
        "joint pain",
        "muscle pain",
        "chest pain",
        "abdominal pain",
        "back pain",
        "neck pain",
        "dizziness",
        "fatigue",
        "weakness",
        "shortness of breath",
        "palpitations",
        "high blood pressure",
        "low blood pressure",
        "diabetes",
        "sugar",
        "blood sugar",
        "cholesterol",
        "migraine",
        "sinusitis",
        "allergy",
        "rash",
        "itching",
        "swelling",
        "inflammation",
        "infection",
        "wound",
        "cut",
        "bruise",
        "burn",
        "fracture",
        "sprain",
        "insomnia",
        "anxiety",
        "depression",
        "stress",
        "panic attack",
        "seizure",
        "stroke",
        "heart attack",
        "asthma",
        "bronchitis",
        "pneumonia",
        "tuberculosis",
        "malaria",
        "dengue",
        "typhoid",
        "jaundice",
        "kidney stones",
        "liver problems",
        "stomach ulcer",
        "gastritis",
        "acidity",
        "heartburn",
        "bloating",
        "gas",
        "indigestion",
      ],
      body_parts: [
        "head",
        "eye",
        "ear",
        "nose",
        "mouth",
        "throat",
        "neck",
        "shoulder",
        "arm",
        "hand",
        "finger",
        "chest",
        "heart",
        "lung",
        "stomach",
        "liver",
        "kidney",
        "leg",
        "foot",
        "knee",
        "ankle",
        "skin",
        "hair",
        "teeth",
        "tongue",
        "brain",
        "spine",
        "bone",
        "muscle",
        "blood",
        "nerve",
      ],
      medications: [
        "medicine",
        "tablet",
        "capsule",
        "syrup",
        "injection",
        "drops",
        "ointment",
        "cream",
        "antibiotic",
        "painkiller",
        "paracetamol",
        "aspirin",
        "insulin",
        "surgery",
        "operation",
        "therapy",
        "physiotherapy",
        "exercise",
        "diet",
        "rest",
        "hospital",
        "clinic",
        "doctor",
        "checkup",
        "test",
        "scan",
        "x-ray",
        "blood test",
      ],
    },
    hindi: {
      symptoms: [
        "बुखार",
        "सिरदर्द",
        "जी मिचलाना",
        "उल्टी",
        "दस्त",
        "कब्ज",
        "खांसी",
        "जुकाम",
        "गले में दर्द",
        "नाक बहना",
        "बदन दर्द",
        "जोड़ों में दर्द",
        "सीने में दर्द",
        "पेट दर्द",
        "कमर दर्द",
        "चक्कर आना",
        "कमजोरी",
        "सांस लेने में तकलीफ",
        "धड़कन तेज",
        "हाई ब्लड प्रेशर",
        "शुगर",
        "मधुमेह",
        "कोलेस्ट्रॉल",
        "माइग्रेन",
        "एलर्जी",
        "खुजली",
        "सूजन",
        "संक्रमण",
        "घाव",
        "चोट",
        "फ्रैक्चर",
        "नींद नहीं आना",
        "चिंता",
        "तनाव",
        "दमा",
        "मलेरिया",
        "डेंगू",
        "टाइफाइड",
        "पीलिया",
        "किडनी स्टोन",
        "लिवर की समस्या",
        "पेट का अल्सर",
        "गैस",
        "अपचन",
      ],
      body_parts: [
        "सिर",
        "आंख",
        "कान",
        "नाक",
        "मुंह",
        "गला",
        "गर्दन",
        "कंधा",
        "बांह",
        "हाथ",
        "उंगली",
        "छाती",
        "दिल",
        "फेफड़े",
        "पेट",
        "जिगर",
        "किडनी",
        "पैर",
        "पांव",
        "घुटना",
        "टखना",
        "त्वचा",
        "बाल",
        "दांत",
        "जीभ",
        "दिमाग",
        "रीढ़",
        "हड्डी",
        "मांस",
        "खून",
        "नस",
      ],
      medications: [
        "दवा",
        "गोली",
        "कैप्सूल",
        "शरबत",
        "इंजेक्शन",
        "बूंदें",
        "मरहम",
        "क्रीम",
        "एंटीबायोटिक",
        "दर्द निवारक",
        "पैरासिटामोल",
        "एस्पिरिन",
        "इंसुलिन",
        "सर्जरी",
        "ऑपरेशन",
        "थेरेपी",
        "व्यायाम",
        "डाइट",
        "आराम",
        "अस्पताल",
        "क्लिनिक",
        "डॉक्टर",
        "जांच",
        "टेस्ट",
        "स्कैन",
        "एक्स-रे",
        "खून की जांच",
      ],
    },
    malayalam: {
      symptoms: [
        "പനി",
        "തലവേദന",
        "ഓക്കാനം",
        "ഛർദ്ദി",
        "വയറിളക്കം",
        "മലബന്ധം",
        "ചുമ",
        "ജലദോഷം",
        "തൊണ്ടവേദന",
        "മൂക്കൊലിപ്പ്",
        "ശരീരവേദന",
        "സന്ധിവേദന",
        "നെഞ്ചുവേദന",
        "വയറുവേദന",
        "അരയിൽ വേദന",
        "തലകറക്കം",
        "ക്ഷീണം",
        "ശ്വാസതടസ്സം",
        "ഹൃദയമിടിപ്പ്",
        "ഉയർന്ന രക്തസമ്മർദ്ദം",
        "പ്രമേഹം",
        "കൊളസ്ട്രോൾ",
        "മൈഗ്രേൻ",
        "അലർജി",
        "ചൊറിച്ചിൽ",
        "വീക്കം",
        "അണുബാധ",
        "മുറിവ്",
        "പരിക്ക്",
        "അസ്ഥിഭഗ്നം",
        "ഉറക്കമില്ലായ്മ",
        "ഉത്കണ്ഠ",
        "സമ്മർദ്ദം",
        "ആസ്ത്മ",
        "മലേറിയ",
        "ഡെങ്കി",
        "ടൈഫോയ്ഡ്",
        "മഞ്ഞപ്പിത്തം",
        "വൃക്കയിലെ കല്ല്",
        "കരൾ പ്രശ്നങ്ങൾ",
        "വയറ്റിലെ അൾസർ",
        "വാതകം",
        "ദഹനക്കേട്",
      ],
      body_parts: [
        "തല",
        "കണ്ണ്",
        "കാതു്",
        "മൂക്ക്",
        "വായ",
        "തൊണ്ട",
        "കഴുത്ത്",
        "തോൾ",
        "കൈ",
        "വിരൽ",
        "നെഞ്ച്",
        "ഹൃദയം",
        "ശ്വാസകോശം",
        "വയർ",
        "കരൾ",
        "വൃക്ക",
        "കാൽ",
        "പാദം",
        "മുട്ട്",
        "കണങ്കാൽ",
        "ചർമ്മം",
        "മുടി",
        "പല്ല്",
        "നാവ്",
        "തലച്ചോറ്",
        "നട്ടെല്ല്",
        "എല്ല്",
        "പേശി",
        "രക്തം",
        "നാഡി",
      ],
      medications: [
        "മരുന്ന്",
        "ഗുളിക",
        "കാപ്സ്യൂൾ",
        "സിറപ്പ്",
        "കുത്തിവയ്പ്പ്",
        "തുള്ളി",
        "തൈലം",
        "ക്രീം",
        "ആൻറിബയോട്ടിക്",
        "വേദനസംഹാരി",
        "പാരസെറ്റമോൾ",
        "ആസ്പിരിൻ",
        "ഇൻസുലിൻ",
        "ശസ്ത്രക്രിയ",
        "ഓപ്പറേഷൻ",
        "ചികിത്സ",
        "വ്യായാമം",
        "ആഹാരക്രമം",
        "വിശ്രമം",
        "ആശുപത്രി",
        "ക്ലിനിക്ക്",
        "ഡോക്ടർ",
        "പരിശോധന",
        "പരിക്ക്",
        "സ്കാൻ",
        "എക്സ്-റേ",
        "രക്തപരിശോധന",
      ],
    },
  };

  // Health keyword extraction function
  const extractHealthKeywords = (text) => {
    const keywords = [];
    const lowerText = text.toLowerCase();

    Object.entries(healthKeywordsDB).forEach(([language, categories]) => {
      Object.entries(categories).forEach(([category, terms]) => {
        terms.forEach((term) => {
          const lowerTerm = term.toLowerCase();
          if (lowerText.includes(lowerTerm)) {
            let severity = "mild";
            if (
              lowerText.includes("severe") ||
              lowerText.includes("acute") ||
              lowerText.includes("chronic") ||
              lowerText.includes("critical")
            ) {
              severity = "severe";
            } else if (
              lowerText.includes("moderate") ||
              lowerText.includes("bad")
            ) {
              severity = "moderate";
            }
            const confidence = Math.min(0.9, 0.5 + term.length / 20);
            keywords.push({
              keyword: term,
              language,
              category:
                category === "symptoms"
                  ? "symptom"
                  : category === "body_parts"
                  ? "body_part"
                  : category === "medications"
                  ? "medication"
                  : category,
              severity,
              confidence_score: parseFloat(confidence.toFixed(1)),
            });
          }
        });
      });
    });

    const uniqueKeywords = keywords.filter(
      (kw, idx, self) => idx === self.findIndex((k) => k.keyword === kw.keyword)
    );
    return uniqueKeywords;
  };

  const generateCSV = (keywords) => {
    if (!keywords.length)
      return "keyword,language,category,severity,confidence_score\n";
    const header = "keyword,language,category,severity,confidence_score\n";
    const rows = keywords
      .map(
        (k) =>
          `${k.keyword},${k.language},${k.category},${k.severity},${k.confidence_score}`
      )
      .join("\n");
    return header + rows;
  };

  const downloadCSV = (csvContent, filename = "health_keywords.csv") => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const analyzeHealthText = () => {
    const healthTexts = [
      formData.knownAllergies,
      formData.chronicConditions,
      formData.currentMedications,
      formData.vaccinationHistory,
      formData.emergencyMedicalInfo,
    ].filter((t) => t && t.trim().length > 0);

    if (!healthTexts.length) {
      alert("Please enter some health information first.");
      return;
    }

    const combinedText = healthTexts.join(" ");
    const kws = extractHealthKeywords(combinedText);

    if (!kws.length) {
      alert("No health-related keywords found in the text.");
      return;
    }

    setExtractedKeywords(kws);
    setShowKeywordAnalysis(true);

    const csv = generateCSV(kws);
    downloadCSV(csv, `health_keywords_${Date.now()}.csv`);
  };

  // Voice input for a specific field
  const startVoiceInput = (fieldName) => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert(
        "Voice input is not supported in your browser. Please type manually."
      );
      return;
    }

    if (recognitionRef.current) recognitionRef.current.stop();

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;
    setIsListening(true);
    setActiveField(fieldName);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const currentValue = formData[fieldName] || "";
      const newValue = currentValue
        ? `${currentValue} ${transcript}`
        : transcript;
      handleInputChange(fieldName, newValue);

      setIsListening(false);
      setActiveField(null);
      recognitionRef.current = null;
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      setActiveField(null);
      recognitionRef.current = null;

      let msg = "Voice input failed. Please try again or type manually.";
      if (event.error === "no-speech")
        msg = "No speech detected. Please try again.";
      else if (event.error === "audio-capture")
        msg =
          "Microphone access denied. Please enable microphone and try again.";
      alert(msg);
    };

    recognition.onend = () => {
      setIsListening(false);
      setActiveField(null);
      recognitionRef.current = null;
    };

    try {
      recognition.start();
    } catch (err) {
      console.error("Failed to start recognition:", err);
      setIsListening(false);
      setActiveField(null);
      recognitionRef.current = null;
      alert("Failed to start voice input. Please try again.");
    }
  };

  const startHealthVoiceMode = () => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert("Voice input is not supported in your browser.");
      return;
    }
    setHealthVoiceMode(true);
    alert(
      'Health Voice Mode activated! Speak your health information naturally. Say things like "I am allergic to penicillin" or "I have diabetes".'
    );
    setTimeout(() => setHealthVoiceMode(false), 30000);
  };

  // Renders

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
        Personal Information
      </h3>

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Middle Name
          </label>
          <input
            type="text"
            value={formData.middleName}
            onChange={(e) => handleInputChange("middleName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      {/* Date of Birth and Gender */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Contact and Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mobile Number *
        </label>
        <input
          type="tel"
          value={formData.mobileNumber}
          onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="+91 98765 43210"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Permanent Address *
        </label>
        <textarea
          value={formData.permanentAddress}
          onChange={(e) =>
            handleInputChange("permanentAddress", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="3"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Address *
        </label>
        <textarea
          value={formData.currentAddress}
          onChange={(e) => handleInputChange("currentAddress", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="3"
          required
        />
      </div>

      {/* ID Proof */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID Proof Type *
          </label>
          <select
            value={formData.idProofType}
            onChange={(e) => handleInputChange("idProofType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select ID Proof</option>
            <option value="aadhar">Aadhar Card</option>
            <option value="voter">Voter ID</option>
            <option value="pan">PAN Card</option>
            <option value="passport">Passport</option>
            <option value="driving">Driving License</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID Proof Number *
          </label>
          <input
            type="text"
            value={formData.idProofNumber}
            onChange={(e) => handleInputChange("idProofNumber", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Document *
        </label>
        <input
          type="file"
          onChange={handleFileUpload}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          accept=".pdf,.jpg,.jpeg,.png"
          required
        />
      </div>
    </div>
  );

  const renderHealthInfo = () => (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
        Worker's Health Information
      </h3>

      {/* Section 1: Personal Details */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="text-xl font-bold text-gray-800 mb-4">
          Section 1: Personal Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blood Group
            </label>
            <select
              value={formData.bloodGroup}
              onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => handleInputChange("height", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => handleInputChange("weight", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Medical History */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="text-xl font-bold text-gray-800 mb-4">
          Section 2: Medical History
        </h4>
        <div className="space-y-4">
          {[
            {
              field: "knownAllergies",
              label: "Known Allergies",
              placeholder:
                "List any known allergies. Click the mic to use voice input.",
            },
            {
              field: "chronicConditions",
              label: "Chronic Conditions",
              placeholder:
                "List any chronic conditions (e.g., diabetes, hypertension). Click the mic to use voice input.",
            },
            {
              field: "currentMedications",
              label: "Current Medications",
              placeholder:
                "List current medications, including dosage if known. Click the mic to use voice input.",
            },
            {
              field: "vaccinationHistory",
              label: "Vaccination History",
              placeholder:
                "List vaccination history (e.g., COVID-19, Hepatitis B, Tetanus). Click the mic to use voice input.",
            },
            {
              field: "emergencyMedicalInfo",
              label: "Emergency Medical Information",
              placeholder:
                "Any critical medical information for emergencies. Click the mic to use voice input.",
            },
          ].map(({ field, label, placeholder }) => (
            <div key={field}>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <span className="font-semibold">{label}</span>
                <button
                  type="button"
                  onClick={() => startVoiceInput(field)}
                  className={`ml-3 p-2 rounded-full transition-all duration-200 ${
                    isListening && activeField === field
                      ? "bg-red-100 text-red-600 animate-pulse"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                  disabled={isListening && activeField !== field}
                  title="Click to use voice input"
                >
                  🎤
                </button>
                {isListening && activeField === field && (
                  <span className="ml-2 text-sm text-red-600 animate-pulse font-medium">
                    Listening...
                  </span>
                )}
              </label>
              <textarea
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                  activeField === field
                    ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50"
                    : "border-gray-300"
                }`}
                rows="3"
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Employment Information */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="text-xl font-bold text-gray-800 mb-4">
          Section 3: Employment Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employer Name
            </label>
            <input
              type="text"
              value={formData.employerName}
              onChange={(e) =>
                handleInputChange("employerName", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Category
            </label>
            <select
              value={formData.jobCategory}
              onChange={(e) => handleInputChange("jobCategory", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>
              <option value="Finance">Finance</option>
              <option value="Retail">Retail</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Construction">Construction</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Location
            </label>
            <input
              type="text"
              value={formData.workLocation}
              onChange={(e) =>
                handleInputChange("workLocation", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supervisor Contact
            </label>
            <input
              type="tel"
              value={formData.supervisorContact}
              onChange={(e) =>
                handleInputChange("supervisorContact", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="+91 98765 43212"
            />
          </div>
        </div>
      </div>

      {/* Health Voice Mode */}
      <div className="p-4 border-2 border-purple-600 rounded-lg">
        <h4 className="text-xl font-bold text-purple-800 mb-2">
          Health Voice Mode
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          Use voice input to quickly fill health information fields. Speak
          clearly in English, Hindi, or Malayalam.
        </p>
        <button
          type="button"
          onClick={startHealthVoiceMode}
          className={`px-6 py-3 rounded-lg font-bold transition-all ${
            healthVoiceMode
              ? "bg-purple-600 text-white animate-pulse"
              : "bg-purple-100 text-purple-700 hover:bg-purple-200"
          }`}
        >
          {healthVoiceMode ? "🎤 Health Voice Mode Active" : "Use Voice Input"}
        </button>
      </div>

      {/* Advanced Health Analysis Section */}
      <div className="p-4 border-2 border-green-600 rounded-lg">
        <h4 className="text-xl font-bold text-green-800 mb-2">
          🧠 Advanced Health Analysis (AI-Powered)
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          Automatically extract and categorize health keywords from your entered
          information. Supports English, Hindi (हिन्दी), and Malayalam (മലയാളം)
          languages.
        </p>
        <div className="flex gap-4 mb-4">
          <button
            type="button"
            onClick={analyzeHealthText}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all"
          >
            📊 Analyze Health Data & Generate CSV
          </button>
          {extractedKeywords.length > 0 && (
            <button
              type="button"
              onClick={() => setShowKeywordAnalysis(!showKeywordAnalysis)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all"
            >
              {showKeywordAnalysis ? "Hide Analysis" : "Show Analysis"} (
              {extractedKeywords.length} keywords)
            </button>
          )}
        </div>

        {showKeywordAnalysis && extractedKeywords.length > 0 && (
          <div className="mt-4 p-4 border border-green-200 rounded-lg bg-green-50">
            <h5 className="text-lg font-bold text-green-800 mb-3">
              Extracted Health Keywords:
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto">
              {extractedKeywords.map((keyword, index) => (
                <div
                  key={index}
                  className="p-2 bg-white border border-green-300 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <span className="font-semibold text-green-700">
                        {keyword.keyword}
                      </span>
                      <div className="text-xs text-gray-600 mt-1">
                        <span
                          className={`px-2 py-1 rounded ${
                            keyword.language === "english"
                              ? "bg-blue-100 text-blue-700"
                              : keyword.language === "hindi"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {keyword.language}
                        </span>
                        <span
                          className={`ml-1 px-2 py-1 rounded ${
                            keyword.category === "symptom"
                              ? "bg-red-100 text-red-700"
                              : keyword.category === "body_part"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {keyword.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-right">
                      <div
                        className={`px-2 py-1 rounded ${
                          keyword.severity === "severe"
                            ? "bg-red-100 text-red-700"
                            : keyword.severity === "moderate"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {keyword.severity}
                      </div>
                      <div className="text-gray-500 mt-1">
                        {(keyword.confidence_score * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h6 className="font-semibold text-blue-800 mb-2">
                Analysis Summary:
              </h6>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-lg text-blue-600">
                    {
                      extractedKeywords.filter((k) => k.category === "symptom")
                        .length
                    }
                  </div>
                  <div className="text-gray-600">Symptoms</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-yellow-600">
                    {
                      extractedKeywords.filter(
                        (k) => k.category === "body_part"
                      ).length
                    }
                  </div>
                  <div className="text-gray-600">Body Parts</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-green-600">
                    {
                      extractedKeywords.filter(
                        (k) => k.category === "medication"
                      ).length
                    }
                  </div>
                  <div className="text-gray-600">Medications</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-red-600">
                    {
                      extractedKeywords.filter((k) => k.severity === "severe")
                        .length
                    }
                  </div>
                  <div className="text-gray-600">Severe Issues</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 text-xs text-gray-500">
          <p>
            <strong>How it works:</strong> The AI analyzes your health
            information and automatically identifies medical terms, symptoms,
            body parts, and medications in multiple languages, then generates a
            structured CSV for providers.
          </p>
          <p className="mt-1">
            <strong>Languages supported:</strong> English, Hindi (हिन्दी),
            Malayalam (മലയാളം)
          </p>
        </div>
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 inline-block">
          Review Your Information
        </h3>
        <p className="text-gray-600 mt-4 text-lg">
          Please verify all information is correct before submitting
        </p>
      </div>

      {/* Personal Information */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="text-xl font-bold text-gray-800 mb-4">
          Personal Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Full Name:</strong>{" "}
            {`${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim() ||
              "Not specified"}
          </div>
          <div>
            <strong>Mobile Number:</strong>{" "}
            {formData.mobileNumber || "Not specified"}
          </div>
          <div>
            <strong>Gender:</strong> {formData.gender || "Not specified"}
          </div>
          <div>
            <strong>Date of Birth:</strong>{" "}
            {formData.dateOfBirth || "Not specified"}
          </div>
          <div className="md:col-span-2">
            <strong>Permanent Address:</strong>{" "}
            {formData.permanentAddress || "Not specified"}
          </div>
          <div className="md:col-span-2">
            <strong>Current Address:</strong>{" "}
            {formData.currentAddress || "Not specified"}
          </div>
          <div>
            <strong>ID Proof Type:</strong>{" "}
            {formData.idProofType || "Not specified"}
          </div>
          <div>
            <strong>ID Proof Number:</strong>{" "}
            {formData.idProofNumber || "Not specified"}
          </div>
        </div>
      </div>

      {/* Health & Employment Information */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <h4 className="text-xl font-bold text-gray-800 mb-4">
          Health Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Blood Group:</strong>{" "}
            {formData.bloodGroup || "Not specified"}
          </div>
          <div>
            <strong>Job Category:</strong>{" "}
            {formData.jobCategory || "Not specified"}
          </div>
          <div>
            <strong>Height:</strong>{" "}
            {formData.height ? `${formData.height} cm` : "Not specified"}
          </div>
          <div>
            <strong>Weight:</strong>{" "}
            {formData.weight ? `${formData.weight} kg` : "Not specified"}
          </div>
          <div className="md:col-span-2">
            <strong>Known Allergies:</strong>{" "}
            {formData.knownAllergies || "Not specified"}
          </div>
          <div className="md:col-span-2">
            <strong>Chronic Conditions:</strong>{" "}
            {formData.chronicConditions || "Not specified"}
          </div>
          <div className="md:col-span-2">
            <strong>Current Medications:</strong>{" "}
            {formData.currentMedications || "Not specified"}
          </div>
          <div className="md:col-span-2">
            <strong>Vaccination History:</strong>{" "}
            {formData.vaccinationHistory || "Not specified"}
          </div>
          <div className="md:col-span-2">
            <strong>Emergency Medical Info:</strong>{" "}
            {formData.emergencyMedicalInfo || "Not specified"}
          </div>
          <div>
            <strong>Employer Name:</strong>{" "}
            {formData.employerName || "Not specified"}
          </div>
          <div>
            <strong>Work Location:</strong>{" "}
            {formData.workLocation || "Not specified"}
          </div>
          <div>
            <strong>Supervisor Contact:</strong>{" "}
            {formData.supervisorContact || "Not specified"}
          </div>
        </div>
      </div>

      <div className="p-4 border-2 border-green-600 rounded-lg text-center">
        <h4 className="text-xl font-bold text-green-800 mb-2">
          Ready to Submit
        </h4>
        <p className="text-gray-600">
          Your registration will be processed and you'll receive a QR ID for
          health record access.
        </p>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfo();
      case 2:
        return renderHealthInfo();
      case 3:
        return renderReview();
      default:
        return null;
    }
  };

  const handleSubmitRegistration = () => {
    // Final submission hook — integrate API here
    console.log("Submitting registration:", formData);
    alert(
      "Registration submitted successfully! You will receive your QR ID shortly."
    );
    // Navigate back to Officer Dashboard as requested
    navigate("/officer");
  };

  return (
    <div className="flex font-[Quicksand] justify-center min-w-[50px] min-h-screen bg-gray-100">
      <div className="m-0 p-[1rem] w-[90%] max-w-4xl flex items-center flex-col">
        <p className="text-4xl font-extrabold text-blue-600 mb-8">
          Worker Registration
        </p>

        {/* Stepper */}
        <div className="w-full max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => {
              const isCompleted = step.number < currentStep;
              const isCurrent = step.number === currentStep;

              return (
                <div key={step.number} className="flex items-center">
                  {/* Step Circle */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-200
                        ${
                          isCompleted || isCurrent
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-gray-200 text-gray-600 border-gray-300"
                        }
                      `}
                    >
                      {step.number}
                    </div>
                    <span
                      className={`text-sm mt-2 font-medium ${
                        isCurrent ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {/* Connector */}
                  {index < steps.length - 1 && (
                    <div
                      className={`w-24 h-1 mx-4 rounded transition-all duration-200 ${
                        isCompleted ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <div className="border-[1px] border-blue-100 border-solid shadow-2xl rounded-lg p-6 min-h-[400px] bg-white">
            {renderStepContent()}
          </div>
        </div>

        {/* Footer controls */}
        <div className="flex justify-center gap-4 w-full max-w-2xl">
          <button
            onClick={currentStep === 1 ? handleBackToLogin : handlePrevious}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-all"
          >
            {currentStep === 1 ? "Back to Login" : "Previous"}
          </button>

          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmitRegistration}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
            >
              Submit Registration
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerRegistration;
