const fs = require('fs');
const path = require('path');

const times = [
  { start: "08:00", end: "09:00" },
  { start: "09:00", end: "10:00" },
  { start: "10:45", end: "11:45" },
  { start: "12:30", end: "13:30" },
  { start: "13:30", end: "14:30" }
];
const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

// Define subjects and their required slot counts
const plan10 = [
  { code: "MP01", name: "Pendidikan Agama", count: 3 },
  { code: "MP02", name: "Pend. Pancasila", count: 2 },
  { code: "MP03", name: "Bahasa Indonesia", count: 4 },
  { code: "MP04", name: "Matematika", count: 4 },
  { code: "MP05", name: "Bahasa Inggris", count: 3 },
  { code: "MP06", name: "Informatika", count: 3 },
  { code: "MP07", name: "Seni Budaya", count: 2 },
  { code: "MP08", name: "PJOK", count: 2 },
  { code: "MP09", name: "Sejarah", count: 2 }
];

const planIPA = [
  { code: "MP01", name: "Pendidikan Agama", count: 2 },
  { code: "MP02", name: "Pend. Pancasila", count: 2 },
  { code: "MP03", name: "Bahasa Indonesia", count: 3 },
  { code: "MP04", name: "Matematika T.L.", count: 4 },
  { code: "MP05", name: "Bahasa Inggris", count: 2 },
  { code: "IPA01", name: "Fisika", count: 4 },
  { code: "IPA02", name: "Kimia", count: 4 },
  { code: "IPA03", name: "Biologi", count: 4 }
];

const planIPS = [
  { code: "MP01", name: "Pendidikan Agama", count: 2 },
  { code: "MP02", name: "Pend. Pancasila", count: 2 },
  { code: "MP03", name: "Bahasa Indonesia", count: 3 },
  { code: "MP04", name: "Matematika", count: 4 },
  { code: "MP05", name: "Bahasa Inggris", count: 2 },
  { code: "IPS01", name: "Sosiologi", count: 4 },
  { code: "IPS02", name: "Ekonomi", count: 4 },
  { code: "IPS03", name: "Geografi", count: 4 }
];

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function distribute(plan) {
  let pool = [];
  plan.forEach(subj => {
    for(let i=0; i<subj.count; i++) {
      pool.push({ code: subj.code, name: subj.name, jp: 1 });
    }
  });
  
  let result = [];
  let dayIdx = 0;
  let grid = Array(5).fill(0).map(() => Array(5).fill(null));
  
  plan.sort((a,b) => b.count - a.count);
  
  for (let subj of plan) {
    let placed = 0;
    while(placed < subj.count) {
      let placedThisIter = false;
      for (let d = 0; d < 5; d++) {
        let actualDay = (dayIdx + d) % 5;
        let hasSubjToday = grid[actualDay].some(s => s && s.code === subj.code);
        if (!hasSubjToday) {
          let slots = shuffle([0, 1, 2, 3, 4]);
          for (let s of slots) {
            if (!grid[actualDay][s]) {
              grid[actualDay][s] = { code: subj.code, name: subj.name, jp: 1 };
              placed++;
              placedThisIter = true;
              break;
            }
          }
        }
        if (placed === subj.count) break;
      }
      
      if (!placedThisIter) {
        for (let d = 0; d < 5; d++) {
          let slots = shuffle([0, 1, 2, 3, 4]);
          for (let s of slots) {
            if (!grid[d][s]) {
              grid[d][s] = { code: subj.code, name: subj.name, jp: 1 };
              placed++;
              placedThisIter = true;
              break;
            }
          }
          if (placed === subj.count) break;
        }
      }
      
      dayIdx = (dayIdx + 1) % 5; 
    }
  }

  // Flatten grid to courses array
  result = [];
  for (let d = 0; d < 5; d++) {
    for (let s = 0; s < 5; s++) {
      if (grid[d][s]) {
        result.push({
          code: grid[d][s].code,
          name: grid[d][s].name,
          jp: 1,
          day: days[d],
          start: times[s].start,
          end: times[s].end
        });
      }
    }
  }
  return result;
}

const finalCourses = {
  "10": distribute(plan10),
  "IPA": distribute(planIPA),
  "IPS": distribute(planIPS)
};

// Now read dummyData.js and replace the courses object
let content = fs.readFileSync(path.join(__dirname, 'js/data/dummyData.js'), 'utf-8');

const newCoursesStr = "export const courses = " + JSON.stringify(finalCourses, null, 2) + ";";

content = content.replace(/export const courses = \{[\s\S]*?\};/, newCoursesStr);

// ensure studentGrades includes all new subjects
// (Just skipping this complex regex logic for studentGrades for now, 
// I will just let the script update courses, and I'll update grades manually if needed)

fs.writeFileSync(path.join(__dirname, 'js/data/dummyData.js'), content);
console.log("Successfully updated courses in dummyData.js");
