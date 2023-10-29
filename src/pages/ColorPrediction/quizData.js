import plate1 from "../../assets/images/ishihara plates/1.jpg";
import plate2 from "../../assets/images/ishihara plates/2.jpg";
import plate3 from "../../assets/images/ishihara plates/3.jpg";
import plate4 from "../../assets/images/ishihara plates/4.jpg";
import plate5 from "../../assets/images/ishihara plates/5.jpg";
import plate6 from "../../assets/images/ishihara plates/6.jpg";
import plate7 from "../../assets/images/ishihara plates/7.jpg";
import plate8 from "../../assets/images/ishihara plates/8.jpg";
import plate9 from "../../assets/images/ishihara plates/9.jpg";
import plate10 from "../../assets/images/ishihara plates/10.jpg";
import plate11 from "../../assets/images/ishihara plates/11.jpg";
import plate12 from "../../assets/images/ishihara plates/12.jpg";
import plate13 from "../../assets/images/ishihara plates/13.jpg";
import plate14 from "../../assets/images/ishihara plates/14.jpg";
import plate15 from "../../assets/images/ishihara plates/15.jpg";
import plate16 from "../../assets/images/ishihara plates/16.jpg";
import plate17 from "../../assets/images/ishihara plates/17.jpg";
import plate18 from "../../assets/images/ishihara plates/18.jpg";
import plate19 from "../../assets/images/ishihara plates/19.jpg";
import plate20 from "../../assets/images/ishihara plates/20.jpg";
import plate21 from "../../assets/images/ishihara plates/21.jpg";
import plate22 from "../../assets/images/ishihara plates/22.jpg";
import plate23 from "../../assets/images/ishihara plates/23.jpg";
import plate24 from "../../assets/images/ishihara plates/24.jpg";
import plate25 from "../../assets/images/ishihara plates/25.jpg";
import plate26 from "../../assets/images/ishihara plates/26.jpg";
import plate27 from "../../assets/images/ishihara plates/27.jpg";
import plate28 from "../../assets/images/ishihara plates/28.jpg";
import plate29 from "../../assets/images/ishihara plates/29.jpg";
import plate30 from "../../assets/images/ishihara plates/30.jpg";
import plate31 from "../../assets/images/ishihara plates/31.jpg";
import plate32 from "../../assets/images/ishihara plates/32.jpg";
import plate33 from "../../assets/images/ishihara plates/33.jpg";
import plate34 from "../../assets/images/ishihara plates/34.jpg";
import plate35 from "../../assets/images/ishihara plates/35.jpg";
import plate36 from "../../assets/images/ishihara plates/36.jpg";
import plate37 from "../../assets/images/ishihara plates/37.jpg";
import plate38 from "../../assets/images/ishihara plates/38.jpg";

// --------demostration plate (plate 01)----
// this can be visible to everyone, since that ,the correct answers is allocated with 0 ,
//if they cant see that it is not a problem related to colorblindness,
//since that we are not allocating any marks for that sevierty

//--------transformation plates (plate 02-09)--------
// correct answers means he is not colorblind (0 marks allocated),  10 marks are allocated for the give answer
//(it can be visible to the red-green colorblind),
// 15 marks means the sivierty is high since it is totally different answer

//--------vanishing plates (plate 10 - 17)--------
// correct answers means he is not colorblind(0 marks allocated), in here if the user is colorblind,
// they cant see anything or see something wrong, since that all wrong answers are allocated 10 marks

//--------hidden digits plates (plate 18-21)--------
//normal people cant see any number, then they can are allocated with No Number - 0 marks,
// and 10 marks are allocated for the given answer which can be visible to the red-green colorblind,
// 15 marks means the sivierty is high since it is totally different answer

// -------diagnostic plates (plate 22-25)------
// normal people can see any number, then they can be allocated 0 marks,
//  and 10 marks are allocated for the mild severity of the protonopia or deuteranopia,
// 15 marks can be allocated for the classified answeres,as the strong protonopia or deuteranopia

// -------tracing plates (plate 26-38)--------
// usually used for people who cannot read number
// plate 26-27 >>>>>  colored line is there to identify colors and (normal people can see both purple & red - 0 marks)
//(protanopia people only purple - 10 marks), (deutanopia people only red - 10 marks)

// plate 28-29 >>>>> normal people cant see anything (0 marks), red-green deficiency people see a line (10 marks)

//plate 30-31 >>>>>> normal people can see blue-green line (0 marks), red-green deficiency people cant see anything (10 marks)

//plate 32-33 >>>>>> normal people can see orange line (0 marks), red-green deficiency people cant see anything
//or a false line(10 marks)

//plate 34-35 >>>>>> normal people can see yellow-green line (0 marks), red-green deficiency people can see blue,red,green
//& violet line (10 marks)

//plate 36-37 >>>>>> normal people can see violet-orange line (0 marks),
//red-green deficiency people can see blue,green,violet (10 marks)

//plate 38 >>>>>> everyone should see the same line if yes 0 marks allocated otherwise 10 marks

const quizData = [
  // {
  //   question: "1. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate1,
  //   answers: [
  //     { text: "25", mark: 0 },
  //     { text: "12", mark: 0 },
  //     { text: "30", mark: 0 },
  //     { text: "15", mark: 0 }
  //   ]
  // },
  // {
  //   question: "2. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate2,
  //   answers: [
  //     { text: "3", mark: 10 },
  //     { text: "9", mark: 15 },
  //     { text: "8", mark: 0 },
  //     { text: "6", mark: 15 }
  //   ]
  // },
  // {
  //   question: "3. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate3,
  //   answers: [
  //     { text: "9", mark: 15 },
  //     { text: "5", mark: 10 },
  //     { text: "8", mark: 15 },
  //     { text: "6", mark: 0 }
  //   ]
  // },
  // {
  //   question: "4. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate4,
  //   answers: [
  //     { text: "70", mark: 10 },
  //     { text: "29", mark: 0 },
  //     { text: "26", mark: 15 },
  //     { text: "79", mark: 15 }
  //   ]
  // },
  // {
  //   question: "5. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate5,
  //   answers: [
  //     { text: "52", mark: 15 },
  //     { text: "35", mark: 10 },
  //     { text: "27", mark: 15 },
  //     { text: "57", mark: 0 }
  //   ]
  // },
  // {
  //   question: "6. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate6,
  //   answers: [
  //     { text: "8", mark: 15 },
  //     { text: "5", mark: 0 },
  //     { text: "6", mark: 15 },
  //     { text: "2", mark: 10 }
  //   ]
  // },
  // {
  //   question: "7. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate7,
  //   answers: [
  //     { text: "3", mark: 0 },
  //     { text: "9", mark: 15 },
  //     { text: "8", mark: 15 },
  //     { text: "5", mark: 10 }
  //   ]
  // },
  // {
  //   question: "8. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate8,
  //   answers: [
  //     { text: "17", mark: 10 },
  //     { text: "16", mark: 15 },
  //     { text: "15", mark: 0 },
  //     { text: "75", mark: 15 }
  //   ]
  // },
  // {
  //   question: "9. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate9,
  //   answers: [
  //     { text: "14", mark: 15 },
  //     { text: "74", mark: 0 },
  //     { text: "21", mark: 10 },
  //     { text: "77", mark: 15 }
  //   ]
  // },
  // {
  //   question: "10. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate10,
  //   answers: [
  //     { text: "7", mark: 10 },
  //     { text: "2", mark: 0 },
  //     { text: "අංකයක් දැකගත නොහැක", mark: 10 },
  //     { text: "5", mark: 10 }
  //   ]
  // },
  // {
  //   question: "11. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate11,
  //   answers: [
  //     { text: "අංකයක් දැකගත නොහැක", mark: 10 },
  //     { text: "5", mark: 10 },
  //     { text: "6", mark: 0 },
  //     { text: "8", mark: 10 }
  //   ]
  // },
  // {
  //   question: "12. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate12,
  //   answers: [
  //     { text: "97", mark: 0 },
  //     { text: "92", mark: 10 },
  //     { text: "අංකයක් දැකගත නොහැක", mark: 10 },
  //     { text: "57", mark: 10 }
  //   ]
  // },
  // {
  //   question: "13. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate13,
  //   answers: [
  //     { text: "අංකයක් දැකගත නොහැක", mark: 10 },
  //     { text: "48", mark: 10 },
  //     { text: "45", mark: 0 },
  //     { text: "75", mark: 10 }
  //   ]
  // },
  // {
  //   question: "14. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate14,
  //   answers: [
  //     { text: "8", mark: 10 },
  //     { text: "5", mark: 0 },
  //     { text: "අංකයක් දැකගත නොහැක", mark: 10 },
  //     { text: "6", mark: 10 }
  //   ]
  // },
  // {
  //   question: "15. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate15,
  //   answers: [
  //     { text: "2", mark: 10 },
  //     { text: "අංකයක් දැකගත නොහැක", mark: 10 },
  //     { text: "1", mark: 10 },
  //     { text: "7", mark: 0 }
  //   ]
  // },
  // {
  //   question: "16. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate16,
  //   answers: [
  //     { text: "අංකයක් දැකගත නොහැක", mark: 10 },
  //     { text: "18", mark: 10 },
  //     { text: "16", mark: 0 },
  //     { text: "76", mark: 10 }
  //   ]
  // },
  // {
  //   question: "17. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate17,
  //   answers: [
  //     { text: "73", mark: 0 },
  //     { text: "අංකයක් දැකගත නොහැක", mark: 10 },
  //     { text: "78", mark: 10 },
  //     { text: "13", mark: 10 }
  //   ]
  // },
  // {
  //   question: "18. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate18,
  //   answers: [
  //     { text: "6", mark: 15 },
  //     { text: "5", mark: 10 },
  //     { text: "අංකයක් දැකගත නොහැක", mark: 0 },
  //     { text: "8", mark: 15 }
  //   ]
  // },
  // {
  //   question: "19. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate19,
  //   answers: [
  //     { text: "2", mark: 10 },
  //     { text: "7", mark: 15 },
  //     { text: "අංකයක් දැකගත නොහැක", mark: 0 },
  //     { text: "9", mark: 15 }
  //   ]
  // },
  // {
  //   question: "20. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate20,
  //   answers: [
  //     { text: "75", mark: 15 },
  //     { text: "45", mark: 10 },
  //     { text: "අංකයක් දැකගත නොහැක", mark: 0 },
  //     { text: "25", mark: 15 }
  //   ]
  // },
  // {
  //   question: "21. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
  //   image: plate21,
  //   answers: [
  //     { text: "අංකයක් දැකගත නොහැක", mark: 0 },
  //     { text: "21", mark: 15 },
  //     { text: "73", mark: 10 },
  //     { text: "98 ", mark: 15 }
  //   ]
  // },
  {
    question: "22. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
    image: plate22,
    answers: [
      { text: "2", mark: 15, type: "deuteranopia" },
      { text: "26", mark: 0, type: "normal" },
      { text: "6", mark: 15, type: "protanopia" },
      {
        text: "2 (තරමක් අපැහැදිලියි) 6 (පැහැදිලියි)",
        mark: 10,
        type: "protanopia",
      },
      {
        text: "2 (පැහැදිලියි) 6 (තරමක් අපැහැදිලියි)",
        mark: 10,
        type: "deuteranopia",
      },
    ],
  },
  {
    question: "23. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
    image: plate23,
    answers: [
      { text: "4", mark: 15, type: "deuteranopia" },
      { text: "2", mark: 15, type: "protanopia" },
      {
        text: "4 (තරමක් අපැහැදිලියි) 2 (පැහැදිලියි)",
        mark: 10,
        type: "protanopia",
      },
      {
        text: "4 (පැහැදිලියි) 2 (තරමක් අපැහැදිලියි)",
        mark: 10,
        type: "deuteranopia",
      },
      { text: "42", mark: 0, type: "normal" },
    ],
  },
  {
    question: "24. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
    image: plate24,
    answers: [
      { text: "3", mark: 15, type: "deuteranopia" },
      { text: "35", mark: 0, type: "normal" },
      {
        text: "3 (තරමක් අපැහැදිලියි) 5 (පැහැදිලියි)",
        mark: 10,
        type: "protanopia",
      },
      { text: "5", mark: 15, type: "protanopia" },
      {
        text: "3 (පැහැදිලියි) 5 (තරමක් අපැහැදිලියි)",
        mark: 10,
        type: "deuteranopia",
      },
    ],
  },
  {
    question: "25. පින්තූරයෙ දැක්වෙන නිවැරදි අංකය තෝරන්න",
    image: plate25,
    answers: [
      { text: "6", mark: 15, type: "protanopia" },
      {
        text: "9 (තරමක් අපැහැදිලියි) 6 (පැහැදිලියි)",
        mark: 10,
        type: "protanopia",
      },
      {
        text: "9 (පැහැදිලියි) 6 (තරමක් අපැහැදිලියි)",
        mark: 10,
        type: "deuteranopia",
      },
      { text: "9", mark: 15, type: "deuteranopia" },
      { text: "96", mark: 0, type: "normal" },
    ],
  },

  // red identifieed then orange overlay
  {
    question: "26. පහත පින්තූරයෙහි ඇති රේඛාවෙහි ඔබට දැකගත හැකි වර්ණ මොනවාද?",
    image: plate26,
    answers: [
      {
        text: "දම් සහ රතු පමණි",
        mark: 0,
        overlay2: "255, 165, 0",
        type: "normal",
      }, //orange
      {
        text: "දම් පමණි",
        mark: 10,
        type: "protanopia",
        overlay2: "0, 128, 128",
        type: "normal",
      }, //teal overlay
      {
        text: "රතු පමණි",
        mark: 10,
        type: "deuteranopia",
        overlay2: "255, 165, 0",
        type: "normal",
      }, //orange overlay
    ],
  },
  // {
  //   question: "27. පහත පින්තූරයෙහි ඇති රේඛාවෙහි ඔබට දැකගත හැකි වර්ණ මොනවාද?",
  //   image: plate27,
  //   answers: [
  //     { text: "දම් සහ රතු පමණි", mark: 0 },
  //     { text: "රතු පමණි", mark: 10 , type: 'deuteranopia'},
  //     { text: "දම් පමණි", mark: 10 , type: 'protanopia' },
  //   ]
  // },
  // {
  //   question: "28. පහත පින්තූරයෙහි ඔබට රේඛාවක් වෙන් කර හදුනා ගැනීමට හැකිද?",
  //   image: plate28,
  //   answers: [
  //     { text: "ඔව්", mark: 10 },
  //     { text: "නැත", mark: 0  },

  //   ]
  // },
  // {
  //   question: "29. පහත පින්තූරයෙහි ඔබට රේඛාවක් වෙන් කර හදුනා ගැනීමට හැකිද?",
  //   image: plate29,
  //   answers: [
  //     { text: "ඔව්", mark: 10 },
  //     { text: "නැත", mark: 0  },
  //   ]
  // },

  //green identified then yellow overlay
  {
    question:
      "30. පහත පින්තූරයෙහි ඔබට නිල්-කොළ වර්ණ සහිත රේඛාවක් දැක ගත හැකිද?",
    image: plate30,
    answers: [
      { text: "ඔව්", mark: 0, overlay: "255,255,0", type: "normal" }, //yellow overlay
      { text: "නැත", mark: 10, overlay: "255, 0, 255", type: "normal" }, // magenta overlay
    ],
  },
  // {
  //   question: "31. පහත පින්තූරයෙහි ඔබට නිල්-කොළ වර්ණ සහිත රේඛාවක් දැක ගත හැකිද?",
  //   image: plate31,
  //   answers: [
  //     { text: "ඔව්", mark: 0 },
  //     { text: "නැත", mark: 10   },
  //   ]
  // },
  // {
  //   question: "32. පහත වර්ණ රේඛාවෙහි දැකිය හැකි වර්ණය කුමක්ද?",
  //   image: plate32,
  //   answers: [
  //     { text: "රතු", mark: 10 },
  //     { text: "තැඹිලි", mark: 0 },
  //     { text: "රේඛාවක් දැක ගත නොහැක", mark: 10 },
  //     { text: "නිල්", mark: 10 }
  //   ]
  // },
  // {
  //   question: "33. පහත වර්ණ රේඛාවෙහි දැකිය හැකි වර්ණය කුමක්ද?",
  //   image: plate33,
  //   answers: [

  //     { text: "නිල්", mark: 10 },
  //     { text: "රේඛාවක් දැක ගත නොහැක", mark: 10 },
  //     { text: "තැඹිලි", mark: 0 },
  //     { text: "රතු", mark: 10 },
  //   ]
  // },
  // {
  //   question: "34. පහත වර්ණ රේඛාවෙහි දැකිය හැකි වර්ණය කුමක්ද?",
  //   image: plate34,
  //   answers: [
  //     { text: "නිල්-කොළ සහ කහ-කොළ", mark: 0 },
  //     { text: "රතු-කොළ සහ වයලට්", mark: 10 },

  //   ]
  // },
  // {
  //   question: "35. පහත වර්ණ රේඛාවෙහි දැකිය හැකි වර්ණය කුමක්ද?",
  //   image: plate35,
  //   answers: [
  //     { text: "නිල්-කොළ සහ වයලට්", mark: 10 },
  //     { text: "නිල්-කොළ සහ කහ-කොළ", mark: 0 },
  //   ]
  // },
  // {
  //   question: "36. පහත වර්ණ රේඛාවෙහි දැකිය හැකි වර්ණය කුමක්ද?",
  //   image: plate36,
  //   answers: [
  //     { text: "තැඹිලි සහ වයලට්", mark: 0 },
  //     { text: "නිල්-කොළ සහ වයලට්", mark: 10 },
  //   ]
  // },
  // {
  //   question: "37. පහත වර්ණ රේඛාවෙහි දැකිය හැකි වර්ණය කුමක්ද?",
  //   image: plate37,
  //   answers: [
  //      { text: "නිල්-කොළ සහ වයලට්", mark: 10 },
  //      { text: "තැඹිලි සහ වයලට්", mark: 0 },

  //   ]
  // },
  // {
  //   question: "38. පහත වර්ණ රේඛාවෙහි දැකිය හැකි වර්ණය කුමක්ද?",
  //   image: plate38,
  //   answers: [
  //     { text: "රතු", mark: 0 },
  //     { text: "තැඹිලි", mark: 0 },
  //     { text: "රේඛාවක් දැක ගත නොහැක", mark: 0 },
  //     { text: "නිල්", mark: 0 }
  //   ]
  // },
];

export default quizData;
