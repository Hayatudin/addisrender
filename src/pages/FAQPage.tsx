
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const FAQPage = () => {
  const allFaqs = [
    {
      question: "What services does Rend-Plus offer?",
      answer: "We specialize in 3D modeling, rendering, animations, and walkthroughs for architectural designs, product models, and interior spaces."
    },
    {
      question: "How do I place an order for 3D rendering services?",
      answer: "Simply fill out our Order Form with your project details, upload your plans, and we'll get in touch with a personalized quote based on the square meters of your project."
    },
    {
      question: "How are the prices calculated?",
      answer: "Our prices are calculated per square meter, with rates varying based on the complexity and level of detail required. Basic projects start at ETB 5-7/sqm, standard at ETB 8-10/sqm, and premium at ETB 13-15/sqm."
    },
    {
      question: "What is the typical timeline for completion?",
      answer: "The timeline varies based on project complexity and service tier. Basic projects take around 14 days, standard projects 10 days, and premium projects 7 days. Large or complex projects may require additional time."
    },
    {
      question: "What file formats do you accept for project submissions?",
      answer: "We accept architectural files in formats like .dwg, .dxf, .rvt, .skp, .max, .3dm, .pln, and .dae. For reference materials, you can upload images, PDFs, or any visual references that help us understand your vision."
    },
    {
      question: "What types of projects do you work on?",
      answer: "We work on a wide range of projects, including residential and commercial buildings, product visualizations, interior designs, and more."
    },
    {
      question: "Can I make revisions during the project?",
      answer: "Yes, we offer revisions based on your feedback. The number of revisions depends on the project scope and package selected, but we'll ensure your satisfaction throughout the process."
    },
    {
      question: "What file formats will I receive my 3D models and renderings in?",
      answer: "You'll receive models in formats like .obj, .fbx, .stl, and renderings in .jpg, .png, .tiff, or .psd. We can adjust the format based on your requirements."
    },
    {
      question: "Do you offer 3D animation and walkthroughs?",
      answer: "Yes, we provide dynamic 3D animations and interactive walkthroughs to help visualize architectural designs or showcase products. These are available as add-ons to our standard packages."
    },
    {
      question: "How can I contact Rend-Plus for custom requests?",
      answer: "You can reach us via email, phone, or by filling out our contact form. For detailed project requests, use our Quote Form to provide your project specifics."
    }
  ];