'use client';

import React, { useState, useRef } from 'react';
import { FileText, Download, Printer, Eye, Save, Search, Menu, X, ChevronRight, Beaker, Clipboard, FlaskConical, Shield, Trash2, Settings, Calendar, ClipboardCheck, BookOpen, FileCheck, BarChart3, Clock, Home, LogIn, LogOut, Upload } from 'lucide-react';

// Google OAuth configuration
const GOOGLE_CLIENT_ID = '928054957452-tgasuimfaq2v2h488665l2rrc1gf4tm2.apps.googleusercontent.com';

// Template definitions with Synthetic Lab Notebook added
const templates = [
{
  id: 21,
  name: "Synthetic Lab Notebook",
  icon: BookOpen,
  category: "Synthesis",
  fields: [
    { 
      label: "Date & Time", 
      type: "datetime",
      fields: [
        { label: "Date", type: "date" },
        { label: "Time", type: "time" }
      ]
    },
    { label: "Experiment Number", type: "text", placeholder: "e.g., EXP-2025-001" },
    { label: "Target Compound", type: "text", placeholder: "Compound name or code..." },
    { label: "Objective", type: "textarea", placeholder: "What are you trying to synthesize or achieve..." },
    { label: "Reaction Scheme", type: "textarea", placeholder: "Describe the reaction pathway..." },
    { 
      label: "Reaction Equation", 
      type: "image-upload",
      buttonText: "Upload Reaction Equation Image"
    },
    { label: "Starting Materials", type: "table", columns: ["Material", "MW (g/mol)", "Amount (g)", "mmol", "Equiv", "Supplier"] },
    { 
      label: "Reagents & Catalysts", 
      type: "table", 
      columns: ["Type", "Chemical Name", "MW", "Mole", "g", "d", "ml", "Purity", "Notes"],
      hasRadio: true,
      radioOptions: ["Reactant", "Solvent"]
    },
    { label: "Procedure", type: "textarea", placeholder: "Detailed step-by-step procedure..." },
    { 
      label: "Reaction Conditions", 
      type: "group",
      fields: [
        { label: "Temperature", type: "text", placeholder: "e.g., 25°C, reflux..." },
        { label: "Pressure", type: "text", placeholder: "e.g., atmospheric, 5 atm..." },
        { label: "Time", type: "text", placeholder: "e.g., 2 hours, overnight..." },
        { label: "Stirring Rate", type: "text", placeholder: "e.g., 500 rpm..." }
      ]
    },
    { 
      label: "Observations", 
      type: "group",
      fields: [
        { label: "Color Changes", type: "text", placeholder: "Describe any color changes observed..." },
        { label: "Gas Evolution", type: "text", placeholder: "Describe any gas evolution..." },
        { label: "Temperature Changes", type: "text", placeholder: "Describe temperature changes..." },
        { label: "Other", type: "text", placeholder: "Other observations..." }
      ]
    },
    { label: "Work-up Procedure", type: "textarea", placeholder: "Extraction, washing, drying steps..." },
    { label: "Purification Method", type: "text", placeholder: "Column chromatography, recrystallization..." },
    { label: "Crude Yield", type: "text", placeholder: "Weight and appearance..." },
    { label: "Pure Yield", type: "text", placeholder: "Final weight and % yield..." },
    { 
      label: "TLC Analysis", 
      type: "multi-image-upload",
      uploadButtons: [
        { label: "Upload TLC Image 1", id: "tlc1" },
        { label: "Upload TLC Image 2", id: "tlc2" },
        { label: "Upload TLC Image 3", id: "tlc3" }
      ]
    },
    { 
      label: "Product Characteristics", 
      type: "table", 
      columns: ["Crystal", "Powder", "Color", "MP", "Other"]
    },
    { 
      label: "Product Spectroscopy", 
      type: "table", 
      columns: ["IR", "MS", "H NMR", "C NMR", "Other"]
    },
    { label: "Characterization Data", type: "textarea", placeholder: "Additional NMR, MS, IR, melting point data..." },
    { label: "Notes", type: "textarea", placeholder: "Additional notes, comments, or observations..." },
    { label: "Hazard Information", type: "textarea", placeholder: "Safety concerns, hazardous materials, protective equipment used..." },
    { label: "Conclusion", type: "textarea", placeholder: "Success, issues, next steps..." },
    { label: "References", type: "textarea", placeholder: "Literature procedures, previous experiments..." }
  ]
},
{
    id: 1,
    name: "Reaction Planning",
    icon: Beaker,
    category: "Synthesis",
    fields: [
      { label: "Objective/Hypothesis", type: "textarea", placeholder: "Describe the objective..." },
      { label: "Reaction Scheme", type: "textarea", placeholder: "Draw or describe reaction scheme..." },
      { label: "Expected Outcomes", type: "textarea", placeholder: "What do you expect to happen..." },
      { label: "Procedure Steps", type: "textarea", placeholder: "Step-by-step procedure..." },
      { label: "Reagents & Properties", type: "table", columns: ["Reagent", "MW", "Density", "mmol", "Equivalents"] },
      { label: "Monitoring Method", type: "text", placeholder: "TLC, GC, NMR..." },
      { label: "Safety Notes & Hazards", type: "textarea", placeholder: "List all safety concerns..." }
    ]
  },
  {
    id: 2,
    name: "Reagent & Stock Solution Preparation",
    icon: FlaskConical,
    category: "Preparation",
    fields: [
      { label: "Solution Name", type: "text", placeholder: "Enter solution name..." },
      { label: "Chemicals Used", type: "textarea", placeholder: "List all chemicals..." },
      { label: "Batch/Lot Number", type: "text", placeholder: "Enter batch number..." },
      { label: "Concentration", type: "text", placeholder: "Enter concentration..." },
      { label: "Concentration Calculations", type: "textarea", placeholder: "Show calculations..." },
      { label: "Preparation Steps", type: "textarea", placeholder: "Detailed steps..." },
      { label: "Date Prepared", type: "date" },
      { label: "Expiry Date", type: "date" },
      { label: "Storage Conditions", type: "text", placeholder: "Temperature, light sensitivity..." }
    ]
  },
  {
    id: 3,
    name: "Characterization Data",
    icon: BarChart3,
    category: "Analysis",
    fields: [
      { label: "Sample ID", type: "text", placeholder: "Unique sample identifier..." },
      { label: "NMR Data", type: "textarea", placeholder: "Chemical shifts, coupling constants..." },
      { label: "IR Data", type: "textarea", placeholder: "Key absorption bands (cm⁻¹)..." },
      { label: "Mass Spec", type: "textarea", placeholder: "m/z values, fragmentation pattern..." },
      { label: "HPLC/GC Run Info", type: "textarea", placeholder: "Retention time, method..." },
      { label: "Purity %", type: "text", placeholder: "Enter purity percentage..." },
      { label: "Additional Notes", type: "textarea", placeholder: "Other observations..." }
    ]
  },
  {
    id: 4,
    name: "Compound Inventory",
    icon: Clipboard,
    category: "Inventory",
    fields: [
      { label: "Compound Code", type: "text", placeholder: "e.g., ABC-001..." },
      { label: "Compound Name", type: "text", placeholder: "IUPAC or common name..." },
      { label: "Structure Description", type: "textarea", placeholder: "Describe structure or attach image..." },
      { label: "Molecular Formula", type: "text", placeholder: "e.g., C10H12N2O..." },
      { label: "Molecular Weight", type: "text", placeholder: "g/mol..." },
      { label: "Purity", type: "text", placeholder: "% purity..." },
      { label: "Storage Location", type: "text", placeholder: "Shelf, freezer, cabinet..." },
      { label: "Quantity", type: "text", placeholder: "Amount and unit..." },
      { label: "Date Received", type: "date" },
      { label: "Stability Notes", type: "textarea", placeholder: "Storage conditions, stability..." }
    ]
  },
  {
    id: 5,
    name: "Solvent & Reagent Inventory",
    icon: FlaskConical,
    category: "Inventory",
    fields: [
      { label: "Name", type: "text", placeholder: "Chemical name..." },
      { label: "CAS Number", type: "text", placeholder: "CAS registry number..." },
      { label: "Hazard Classification", type: "text", placeholder: "GHS classifications..." },
      { label: "Storage Requirements", type: "text", placeholder: "Temperature, ventilation..." },
      { label: "Amount Remaining", type: "text", placeholder: "Volume/weight..." },
      { label: "Supplier", type: "text", placeholder: "Supplier name..." },
      { label: "Lot Number", type: "text", placeholder: "Batch/lot..." },
      { label: "Date Opened", type: "date" },
      { label: "Expiry Date", type: "date" }
    ]
  },
  {
    id: 6,
    name: "Instrument Run Log",
    icon: Settings,
    category: "Equipment",
    fields: [
      { label: "Instrument Name", type: "text", placeholder: "e.g., NMR-400, HPLC-01..." },
      { label: "User Name", type: "text", placeholder: "Your name..." },
      { label: "Date", type: "date" },
      { label: "Time", type: "time" },
      { label: "Sample ID", type: "text", placeholder: "Sample identifier..." },
      { label: "Method Used", type: "text", placeholder: "Method name or number..." },
      { label: "Run Parameters", type: "textarea", placeholder: "Key parameters..." },
      { label: "Observations", type: "textarea", placeholder: "Results, issues..." },
      { label: "Data File Location", type: "text", placeholder: "File path or ID..." }
    ]
  },
  {
    id: 7,
    name: "Purification Log",
    icon: Beaker,
    category: "Synthesis",
    fields: [
      { label: "Sample ID", type: "text", placeholder: "Compound identifier..." },
      { label: "Purification Method", type: "text", placeholder: "Column chromatography, recrystallization..." },
      { label: "Solvent System", type: "text", placeholder: "e.g., Hexane:EtOAc 3:1..." },
      { label: "Column Size/Conditions", type: "text", placeholder: "Dimensions, flow rate..." },
      { label: "TLC Rf Values", type: "text", placeholder: "Rf of product and impurities..." },
      { label: "Fractions Collected", type: "textarea", placeholder: "Fraction numbers and observations..." },
      { label: "Crude Mass", type: "text", placeholder: "Starting material weight..." },
      { label: "Pure Mass", type: "text", placeholder: "Final product weight..." },
      { label: "Yield %", type: "text", placeholder: "Calculate percentage..." }
    ]
  },
  {
    id: 8,
    name: "Safety & Risk Assessment",
    icon: Shield,
    category: "Safety",
    fields: [
      { label: "Task Description", type: "textarea", placeholder: "Describe the experiment or procedure..." },
      { label: "Chemicals Involved", type: "textarea", placeholder: "List all chemicals with hazards..." },
      { label: "Hazards Identified", type: "textarea", placeholder: "Physical, health, environmental hazards..." },
      { label: "Risk Level", type: "select", options: ["Low", "Medium", "High", "Extreme"] },
      { label: "PPE Required", type: "textarea", placeholder: "Gloves, goggles, lab coat, respirator..." },
      { label: "Engineering Controls", type: "textarea", placeholder: "Fume hood, ventilation..." },
      { label: "Risk Mitigation Steps", type: "textarea", placeholder: "Procedures to minimize risk..." },
      { label: "Emergency Procedures", type: "textarea", placeholder: "Spill response, first aid..." },
      { label: "Assessed By", type: "text" },
      { label: "Date", type: "date" }
    ]
  },
  {
    id: 9,
    name: "Waste Disposal Log",
    icon: Trash2,
    category: "Safety",
    fields: [
      { label: "Waste Type", type: "text", placeholder: "Organic, aqueous, solid..." },
      { label: "Contents Description", type: "textarea", placeholder: "Chemicals in waste..." },
      { label: "Date Generated", type: "date" },
      { label: "Container ID", type: "text", placeholder: "Container label/number..." },
      { label: "Volume/Mass", type: "text", placeholder: "Amount of waste..." },
      { label: "Hazard Class", type: "text", placeholder: "Flammable, toxic, corrosive..." },
      { label: "pH (if applicable)", type: "text" },
      { label: "Generated By", type: "text" },
      { label: "Disposal Approval", type: "text", placeholder: "Authorized by..." },
      { label: "Disposal Date", type: "date" }
    ]
  },
  {
    id: 10,
    name: "Calibration Log",
    icon: Settings,
    category: "Equipment",
    fields: [
      { label: "Instrument", type: "text", placeholder: "Balance, pH meter, pipette..." },
      { label: "Instrument ID", type: "text" },
      { label: "Calibration Type", type: "text", placeholder: "Standard, verification..." },
      { label: "Standard Used", type: "text", placeholder: "Reference material..." },
      { label: "Standard Lot Number", type: "text" },
      { label: "Calibration Date", type: "date" },
      { label: "Next Calibration Due", type: "date" },
      { label: "Results", type: "textarea", placeholder: "Calibration readings, pass/fail..." },
      { label: "Calibrated By", type: "text" },
      { label: "Notes", type: "textarea" }
    ]
  },
  {
    id: 11,
    name: "Equipment Maintenance Log",
    icon: Settings,
    category: "Equipment",
    fields: [
      { label: "Instrument", type: "text", placeholder: "NMR, HPLC, GC-MS..." },
      { label: "Instrument ID", type: "text" },
      { label: "Date", type: "date" },
      { label: "Maintenance Type", type: "select", options: ["Preventive", "Repair", "Service", "Emergency"] },
      { label: "Issue/Error Description", type: "textarea", placeholder: "Describe problem if repair..." },
      { label: "Maintenance Performed", type: "textarea", placeholder: "Actions taken..." },
      { label: "Parts Replaced", type: "textarea", placeholder: "List replaced components..." },
      { label: "Technician/Service Engineer", type: "text" },
      { label: "Cost", type: "text" },
      { label: "Next Maintenance Due", type: "date" },
      { label: "Instrument Status", type: "select", options: ["Operational", "Down", "Limited Use"] }
    ]
  },
  {
    id: 12,
    name: "Equipment Booking",
    icon: Calendar,
    category: "Equipment",
    fields: [
      { label: "Equipment", type: "text", placeholder: "Instrument name..." },
      { label: "User Name", type: "text" },
      { label: "User Email", type: "email" },
      { label: "Date", type: "date" },
      { label: "Start Time", type: "time" },
      { label: "End Time", type: "time" },
      { label: "Purpose", type: "textarea", placeholder: "Brief description of experiment..." },
      { label: "Samples", type: "text", placeholder: "Number of samples..." },
      { label: "Special Requirements", type: "textarea", placeholder: "Special conditions needed..." }
    ]
  },
  {
    id: 13,
    name: "Sample Submission Form",
    icon: FileText,
    category: "Analysis",
    fields: [
      { label: "Sample ID", type: "text" },
      { label: "User Name", type: "text" },
      { label: "Contact Email", type: "email" },
      { label: "Date Submitted", type: "date" },
      { label: "Analysis Requested", type: "textarea", placeholder: "NMR, MS, HPLC, etc..." },
      { label: "Sample Type", type: "text", placeholder: "Solid, liquid, solution..." },
      { label: "Solvent (if applicable)", type: "text" },
      { label: "Expected Structure", type: "textarea", placeholder: "Molecular formula, structure..." },
      { label: "Urgency", type: "select", options: ["Routine", "Urgent", "Rush"] },
      { label: "Special Instructions", type: "textarea" }
    ]
  },
  {
    id: 14,
    name: "Temperature/Freezer Monitoring",
    icon: Clock,
    category: "Safety",
    fields: [
      { label: "Location", type: "text", placeholder: "Room number, equipment ID..." },
      { label: "Equipment Type", type: "text", placeholder: "Freezer, refrigerator, incubator..." },
      { label: "Date", type: "date" },
      { label: "Time", type: "time" },
      { label: "Temperature Reading", type: "text", placeholder: "°C or °F..." },
      { label: "Set Point", type: "text", placeholder: "Target temperature..." },
      { label: "Condition", type: "select", options: ["Normal", "Out of Range", "Alarm"] },
      { label: "Alarms/Issues", type: "textarea", placeholder: "Any problems observed..." },
      { label: "Checked By", type: "text" },
      { label: "Action Taken", type: "textarea" }
    ]
  },
  {
    id: 15,
    name: "Lab Cleaning & Inspection Checklist",
    icon: ClipboardCheck,
    category: "Safety",
    fields: [
      { label: "Date", type: "date" },
      { label: "Inspector", type: "text" },
      { label: "Fume Hood Condition", type: "select", options: ["Good", "Needs Attention", "Not Working"] },
      { label: "Fume Hood Notes", type: "textarea" },
      { label: "Chemical Storage", type: "select", options: ["Organized", "Needs Organization", "Safety Issues"] },
      { label: "Chemical Storage Notes", type: "textarea" },
      { label: "Expired Materials Removed", type: "select", options: ["Yes", "No", "N/A"] },
      { label: "Safety Equipment Functional", type: "select", options: ["All Functional", "Some Issues", "Critical Issues"] },
      { label: "Safety Equipment Notes", type: "textarea" },
      { label: "Overall Lab Cleanliness", type: "select", options: ["Excellent", "Good", "Fair", "Poor"] },
      { label: "Issues Found", type: "textarea" },
      { label: "Corrective Actions", type: "textarea" }
    ]
  },
  {
    id: 16,
    name: "Student Experiment Template",
    icon: BookOpen,
    category: "Education",
    fields: [
      { label: "Experiment Title", type: "text" },
      { label: "Student Name", type: "text" },
      { label: "Date", type: "date" },
      { label: "Learning Goals", type: "textarea", placeholder: "What should students learn..." },
      { label: "Introduction/Theory", type: "textarea" },
      { label: "Materials Needed", type: "textarea" },
      { label: "Procedure", type: "textarea", placeholder: "Step-by-step instructions..." },
      { label: "Data Table", type: "table", columns: ["Observation", "Result", "Notes"] },
      { label: "Calculations", type: "textarea" },
      { label: "Results", type: "textarea" },
      { label: "Discussion Questions", type: "textarea" },
      { label: "Conclusion", type: "textarea" }
    ]
  },
  {
    id: 17,
    name: "Assessment Template",
    icon: FileCheck,
    category: "Education",
    fields: [
      { label: "Experiment Name", type: "text" },
      { label: "Student Name", type: "text" },
      { label: "Date", type: "date" },
      { label: "Pre-Lab Questions", type: "textarea", placeholder: "Questions and answers..." },
      { label: "Pre-Lab Score", type: "text", placeholder: "Score/Total..." },
      { label: "Technique Observations", type: "textarea", placeholder: "Assess lab technique..." },
      { label: "Safety Compliance", type: "select", options: ["Excellent", "Good", "Satisfactory", "Needs Improvement"] },
      { label: "Data Quality", type: "select", options: ["Excellent", "Good", "Satisfactory", "Poor"] },
      { label: "Post-Lab Questions", type: "textarea" },
      { label: "Post-Lab Score", type: "text" },
      { label: "Overall Grade", type: "text" },
      { label: "Feedback/Comments", type: "textarea" }
    ]
  },
  {
    id: 18,
    name: "SOP Template",
    icon: FileText,
    category: "Documentation",
    fields: [
      { label: "SOP Title", type: "text" },
      { label: "SOP Number", type: "text" },
      { label: "Version", type: "text" },
      { label: "Effective Date", type: "date" },
      { label: "Author", type: "text" },
      { label: "Purpose", type: "textarea", placeholder: "Why this SOP exists..." },
      { label: "Scope", type: "textarea", placeholder: "What this SOP covers..." },
      { label: "Materials Needed", type: "textarea" },
      { label: "Procedure", type: "textarea", placeholder: "Detailed step-by-step..." },
      { label: "Safety Warnings", type: "textarea" },
      { label: "Quality Control", type: "textarea" },
      { label: "Troubleshooting", type: "textarea", placeholder: "Common issues and solutions..." },
      { label: "References", type: "textarea" }
    ]
  },
  {
    id: 19,
    name: "Method Validation Template",
    icon: BarChart3,
    category: "Analysis",
    fields: [
      { label: "Method Name", type: "text" },
      { label: "Analyte", type: "text" },
      { label: "Matrix", type: "text" },
      { label: "Date", type: "date" },
      { label: "Analyst", type: "text" },
      { label: "Accuracy (%)", type: "text", placeholder: "Recovery percentage..." },
      { label: "Precision (RSD %)", type: "text" },
      { label: "Linearity (R²)", type: "text" },
      { label: "Concentration Range", type: "text" },
      { label: "LOD (Limit of Detection)", type: "text" },
      { label: "LOQ (Limit of Quantification)", type: "text" },
      { label: "Specificity", type: "textarea", placeholder: "Interference studies..." },
      { label: "Robustness", type: "textarea", placeholder: "Parameter variations tested..." },
      { label: "Conclusion", type: "textarea" }
    ]
  },
  {
    id: 20,
    name: "Project Timeline",
    icon: Calendar,
    category: "Planning",
    fields: [
      { label: "Project Title", type: "text" },
      { label: "Project Lead", type: "text" },
      { label: "Start Date", type: "date" },
      { label: "Target Completion", type: "date" },
      { label: "Objective", type: "textarea" },
      { label: "Key Experiments", type: "textarea", placeholder: "List major experiments..." },
      { label: "Milestones", type: "table", columns: ["Milestone", "Target Date", "Status", "Notes"] },
      { label: "Resources Needed", type: "textarea" },
      { label: "Risks/Challenges", type: "textarea" },
      { label: "Current Status", type: "select", options: ["Planning", "In Progress", "On Hold", "Completed"] },
      { label: "Notes", type: "textarea" }
    ]
  }
];

const categories = ["All", "Synthesis", "Preparation", "Analysis", "Inventory", "Equipment", "Safety", "Education", "Documentation", "Planning"];

export default function ChemLabTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showPreview, setShowPreview] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [savingToDrive, setSavingToDrive] = useState(false);
  const printRef = useRef();

  const filteredTemplates = templates.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleGoogleSignIn = () => {
    alert('To enable Google Drive integration:\n\n1. Set up Google OAuth 2.0 at console.cloud.google.com\n2. Enable Google Drive API\n3. Replace GOOGLE_CLIENT_ID in the code\n4. Use Google Sign-In library');
    
    setUser({
      name: 'Demo User',
      email: 'demo@example.com',
      picture: 'https://via.placeholder.com/40'
    });
  };

  const handleGoogleSignOut = () => {
    setUser(null);
  };

  const handleSaveToGoogleDrive = async () => {
    if (!user) {
      alert('Please sign in with Google first');
      return;
    }

    if (!selectedTemplate) {
      alert('No template selected');
      return;
    }

    setSavingToDrive(true);

    try {
      const docContent = generateDocumentContent();
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Document would be saved to Google Drive as:\n"' + selectedTemplate.name + ' - ' + new Date().toLocaleDateString() + '.pdf"\n\nTo implement: Use Google Drive API v3');
      
    } catch (error) {
      alert('Error saving to Google Drive: ' + error.message);
    } finally {
      setSavingToDrive(false);
    }
  };

  const generateDocumentContent = () => {
    let content = selectedTemplate.name + '\n';
    content += 'Generated: ' + new Date().toLocaleString() + '\n\n';
    
    selectedTemplate.fields.forEach(field => {
      const value = formData[field.label];
      if (value) {
        content += field.label + ':\n';
        if (Array.isArray(value)) {
          value.forEach(row => {
            content += row.join(' | ') + '\n';
          });
        } else if (typeof value === 'object') {
          Object.keys(value).forEach(key => {
            content += key + ': ' + value[key] + '\n';
          });
        } else {
          content += value + '\n';
        }
        content += '\n';
      }
    });
    
    return content;
  };

  const handleFieldChange = (fieldLabel, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldLabel]: value
    }));
  };

  const handleGroupFieldChange = (groupLabel, subfieldLabel, value) => {
    setFormData(prev => ({
      ...prev,
      [groupLabel]: {
        ...(prev[groupLabel] || {}),
        [subfieldLabel]: value
      }
    }));
  };

  const handleImageUpload = (fieldLabel, imageId, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          [fieldLabel]: {
            ...(prev[fieldLabel] || {}),
            [imageId]: reader.result
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTableChange = (fieldLabel, rowIndex, colIndex, value) => {
    const currentTable = formData[fieldLabel] || [[]];
    const newTable = [...currentTable];
    if (!newTable[rowIndex]) newTable[rowIndex] = [];
    newTable[rowIndex][colIndex] = value;
    setFormData(prev => ({
      ...prev,
      [fieldLabel]: newTable
    }));
  };

  const addTableRow = (fieldLabel, columns) => {
    const currentTable = formData[fieldLabel] || [];
    setFormData(prev => ({
      ...prev,
      [fieldLabel]: [...currentTable, new Array(columns.length).fill('')]
    }));
  };

  const handlePrint = () => {
    if (!selectedTemplate || Object.keys(formData).length === 0) {
      alert('Please fill out the template before printing');
      return;
    }
    window.print();
  };

  const handleSavePDF = () => {
    if (!selectedTemplate || Object.keys(formData).length === 0) {
      alert('Please fill out the template before saving as PDF');
      return;
    }
    
    alert('To save as PDF:\n1. Click Print\n2. Select "Save as PDF" as your printer\n3. Click Save');
    window.print();
  };

  const resetForm = () => {
    if (confirm('Are you sure you want to reset this form? All data will be lost.')) {
      setFormData({});
    }
  };

  const renderField = (field, index) => {
    const value = formData[field.label] || '';

    // Handle datetime group (Date & Time)
    if (field.type === 'datetime' && field.fields) {
      return (
        <div key={index} className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
          <div className="grid grid-cols-2 gap-4">
            {field.fields.map((subfield, idx) => (
              <div key={idx}>
                <label className="block text-xs text-gray-600 mb-1">{subfield.label}</label>
                <input
                  type={subfield.type}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={value[subfield.label] || ''}
                  onChange={(e) => handleGroupFieldChange(field.label, subfield.label, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Handle grouped fields (Reaction Conditions, Observations)
    if (field.type === 'group' && field.fields) {
      return (
        <div key={index} className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">{field.label}</label>
          <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
            {field.fields.map((subfield, idx) => (
              <div key={idx}>
                <label className="block text-xs font-medium text-gray-600 mb-1">{subfield.label}</label>
                <input
                  type={subfield.type || 'text'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={subfield.placeholder}
                  value={value[subfield.label] || ''}
                  onChange={(e) => handleGroupFieldChange(field.label, subfield.label, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Handle single image upload
    if (field.type === 'image-upload') {
      return (
        <div key={index} className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors">
              <Upload className="w-5 h-5" />
              {field.buttonText || 'Upload Image'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(field.label, 'main', e.target.files[0])}
              />
            </label>
            {value?.main && (
              <div className="relative">
                <img src={value.main} alt="Uploaded" className="h-20 w-20 object-cover rounded-lg border border-gray-300" />
                <button
                  onClick={() => handleFieldChange(field.label, null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Handle multiple image uploads
    if (field.type === 'multi-image-upload' && field.uploadButtons) {
      return (
        <div key={index} className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">{field.label}</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {field.uploadButtons.map((btn, btnIdx) => (
              <div key={btnIdx} className="flex flex-col gap-2">
                <label className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors justify-center">
                  <Upload className="w-5 h-5" />
                  {btn.label}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(field.label, btn.id, e.target.files[0])}
                  />
                </label>
                {value?.[btn.id] && (
                  <div className="relative">
                    <img src={value[btn.id]} alt={btn.label} className="w-full h-32 object-cover rounded-lg border border-gray-300" />
                    <button
                      onClick={() => {
                        const newValue = { ...value };
                        delete newValue[btn.id];
                        handleFieldChange(field.label, newValue);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Handle textarea
    if (field.type === 'textarea') {
      return (
        <div key={index} className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            rows="4"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.label, e.target.value)}
          />
        </div>
      );
    }

    // Handle select dropdown
    if (field.type === 'select') {
      return (
        <div key={index} className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={value}
            onChange={(e) => handleFieldChange(field.label, e.target.value)}
          >
            <option value="">Select an option...</option>
            {field.options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      );
    }

    // Handle table with optional radio buttons
    if (field.type === 'table') {
      const tableData = formData[field.label] || [new Array(field.columns.length).fill('')];
      return (
        <div key={index} className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
          <div className="overflow-x-auto border border-gray-300 rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {field.columns.map((col, i) => (
                    <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-t border-gray-200">
                    {field.columns.map((col, colIdx) => (
                      <td key={colIdx} className="px-4 py-2">
                        {field.hasRadio && colIdx === 0 ? (
                          <select
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                            value={row[colIdx] || ''}
                            onChange={(e) => handleTableChange(field.label, rowIdx, colIdx, e.target.value)}
                          >
                            <option value="">Select...</option>
                            {field.radioOptions.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                            value={row[colIdx] || ''}
                            onChange={(e) => handleTableChange(field.label, rowIdx, colIdx, e.target.value)}
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => addTableRow(field.label, field.columns)}
            className="mt-2 px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            + Add Row
          </button>
        </div>
      );
    }

    // Handle regular input fields (text, date, time, email, etc.)
    return (
      <div key={index} className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
        <input
          type={field.type || 'text'}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => handleFieldChange(field.label, e.target.value)}
        />
      </div>
    );
  };

  const PreviewModal = () => {
    if (!showPreview || !selectedTemplate) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Preview: {selectedTemplate.name}</h2>
            <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto flex-1 print-content" ref={printRef}>
            <div className="space-y-6">
              <div className="border-b pb-4 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{selectedTemplate.name}</h1>
                <p className="text-sm text-gray-500 mt-2">Generated: {new Date().toLocaleString()}</p>
              </div>
              
              {selectedTemplate.fields.map((field, idx) => {
                const value = formData[field.label];
                if (!value || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) return null;

                // Handle table preview
                if (field.type === 'table') {
                  return (
                    <div key={idx} className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">{field.label}</h3>
                      <table className="w-full border border-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            {field.columns.map((col, i) => (
                              <th key={i} className="px-3 py-2 text-left text-sm font-semibold border-b">{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {value.map((row, rowIdx) => (
                            <tr key={rowIdx} className="border-b">
                              {row.map((cell, cellIdx) => (
                                <td key={cellIdx} className="px-3 py-2 text-sm">{cell || '-'}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                // Handle group fields preview
                if (field.type === 'group' || field.type === 'datetime') {
                  return (
                    <div key={idx} className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">{field.label}</h3>
                      <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                        {Object.entries(value).map(([key, val]) => (
                          <div key={key}>
                            <span className="font-medium text-gray-700">{key}:</span> {val}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                // Handle image uploads preview
                if ((field.type === 'image-upload' || field.type === 'multi-image-upload') && typeof value === 'object') {
                  return (
                    <div key={idx} className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">{field.label}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(value).map(([key, imgSrc]) => (
                          <img key={key} src={imgSrc} alt={key} className="w-full h-48 object-contain rounded-lg border border-gray-300" />
                        ))}
                      </div>
                    </div>
                  );
                }

                // Handle regular text fields
                return (
                  <div key={idx} className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">{field.label}</h3>
                    <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded-lg">{value}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="p-6 border-t border-gray-200 flex gap-3 no-print">
            <button onClick={handlePrint} className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
              <Printer className="w-5 h-5" />
              Print
            </button>
            <button onClick={handleSavePDF} className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Save PDF
            </button>
            {user && (
              <button 
                onClick={handleSaveToGoogleDrive} 
                disabled={savingToDrive}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {savingToDrive ? 'Saving...' : 'Save to Drive'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                <Menu className="w-6 h-6" />
              </button>
              <Beaker className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ChemLab Templates</h1>
                <p className="text-sm text-gray-600">Professional Laboratory Template Manager</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {!user ? (
                <button
                  onClick={handleGoogleSignIn}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="hidden sm:inline">Sign in with Google</span>
                  <span className="sm:hidden">Sign in</span>
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2">
                    <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                  <button
                    onClick={handleGoogleSignOut}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden sm:inline">Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        <aside className={'lg:translate-x-0 fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-white border-r border-gray-200 transition-transform duration-300 z-30 overflow-y-auto ' + (sidebarOpen ? 'translate-x-0' : '-translate-x-full')}>
          <div className="p-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={'px-3 py-1 rounded-full text-sm font-medium transition-colors ' + (selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Templates ({filteredTemplates.length})</h3>
              {filteredTemplates.map(template => {
                const Icon = template.icon;
                return (
                  <button
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(template);
                      setFormData({});
                      setSidebarOpen(false);
                    }}
                    className={'w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ' + (selectedTemplate?.id === template.id ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'hover:bg-gray-50 text-gray-700')}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{template.name}</p>
                      <p className="text-xs text-gray-500">{template.category}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-8">
          {!selectedTemplate ? (
            <div className="text-center py-16">
              <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to ChemLab Templates</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Select a template from the sidebar to get started. Create professional laboratory documentation in minutes.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {templates.slice(0, 6).map(template => {
                  const Icon = template.icon;
                  return (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
                    >
                      <Icon className="w-10 h-10 text-blue-600 mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.category}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {React.createElement(selectedTemplate.icon, { className: "w-10 h-10 text-blue-600" })}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedTemplate.name}</h2>
                      <p className="text-sm text-gray-600">{selectedTemplate.category}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                  <button
                    onClick={handleSavePDF}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Save PDF
                  </button>
                  {user && (
                    <button
                      onClick={handleSaveToGoogleDrive}
                      disabled={savingToDrive}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      {savingToDrive ? 'Saving...' : 'Save to Drive'}
                    </button>
                  )}
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center gap-2 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <form onSubmit={(e) => e.preventDefault()}>
                  {selectedTemplate.fields.map((field, idx) => renderField(field, idx))}
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      <PreviewModal />

      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-400">© 2025 ChemLab Templates. Professional Laboratory Documentation System.</p>
            <p className="text-xs text-gray-500 mt-2">Made for chemists, researchers, and laboratory professionals worldwide.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-content, .print-content * {
            visibility: visible;
          }
          .print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}