// 캐릭터 데이터
const characters = [
    {
        name: '캐릭터 1',
        icon: '🗡️',
        description: '캐릭터 1 설명',
        skills: [
            { name: '1스킬', description: '1스킬 설명' },
            { name: '2스킬', description: '2스킬 설명' },
            { name: '3스킬', description: '3스킬 설명' },
            { name: '4스킬', description: '4스킬 설명' }
        ]
    },
    {
        name: '캐릭터 2',
        icon: '🧙',
        description: '캐릭터 2 설명',
        skills: [
            { name: '1스킬', description: '1스킬 설명' },
            { name: '2스킬', description: '2스킬 설명' },
            { name: '3스킬', description: '3스킬 설명' },
            { name: '4스킬', description: '4스킬 설명' }
        ]
    },
    {
        name: '캐릭터 3',
        icon: '🏹',
        description: '캐릭터 3 설명',
        skills: [
            { name: '1스킬', description: '1스킬 설명' },
            { name: '2스킬', description: '2스킬 설명' },
            { name: '3스킬', description: '3스킬 설명' },
            { name: '4스킬', description: '4스킬 설명' }
        ]
    },
    {
        name: '캐릭터 4',
        icon: '🥷',
        description: '캐릭터 4 설명',
        skills: [
            { name: '1스킬', description: '1스킬 설명' },
            { name: '2스킬', description: '2스킬 설명' },
            { name: '3스킬', description: '3스킬 설명' },
            { name: '4스킬', description: '4스킬 설명' }
        ]
    },
    {
        name: '캐릭터 5',
        icon: '🛡️',
        description: '캐릭터 5 설명',
        skills: [
            { name: '1스킬', description: '1스킬 설명' },
            { name: '2스킬', description: '2스킬 설명' },
            { name: '3스킬', description: '3스킬 설명' },
            { name: '4스킬', description: '4스킬 설명' }
        ]
    }
];

// 상태 관리
let selectedCharacter = null;
let selectedSkills = [];

// DOM 요소
const characterScreen = document.getElementById('characterScreen');
const skillScreen = document.getElementById('skillScreen');
const completeScreen = document.getElementById('completeScreen');
const characterCards = document.querySelectorAll('.character-card');
const skillsGrid = document.getElementById('skillsGrid');
const selectedSkillsList = document.getElementById('selectedSkillsList');
const backBtn = document.getElementById('backBtn');
const confirmBtn = document.getElementById('confirmBtn');
const restartBtn = document.getElementById('restartBtn');

// 캐릭터 선택 이벤트
characterCards.forEach(card => {
    card.addEventListener('click', () => {
        // 이전 선택 제거
        characterCards.forEach(c => c.classList.remove('selected'));
        
        // 새로운 선택 추가
        card.classList.add('selected');
        selectedCharacter = parseInt(card.dataset.character);
        selectedSkills = [];
        
        // 스킬 화면으로 전환
        showSkillScreen();
    });
});

// 스킬 선택 화면 표시
function showSkillScreen() {
    const character = characters[selectedCharacter];
    document.getElementById('selectedCharacterName').textContent = character.name;
    
    // 스킬 카드 생성
    skillsGrid.innerHTML = '';
    character.skills.forEach((skill, index) => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
            <div class="skill-name">${skill.name}</div>
            <div class="skill-description">${skill.description}</div>
        `;
        
        skillCard.addEventListener('click', () => {
            toggleSkillSelection(skillCard, index, skill);
        });
        
        skillsGrid.appendChild(skillCard);
    });
    
    updateSelectedSkillsList();
    
    // 화면 전환
    characterScreen.classList.remove('active');
    skillScreen.classList.add('active');
}

// 스킬 선택 토글
function toggleSkillSelection(card, index, skill) {
    const skillIndex = selectedSkills.findIndex(s => s.index === index);
    
    if (skillIndex > -1) {
        // 이미 선택된 스킬 해제
        selectedSkills.splice(skillIndex, 1);
        card.classList.remove('selected');
    } else {
        // 새로운 스킬 선택
        if (selectedSkills.length < 2) {
            selectedSkills.push({ index, name: skill.name, description: skill.description });
            card.classList.add('selected');
        } else {
            // 2개가 이미 선택되었으면 다른 스킬로 변경
            const oldCard = skillsGrid.children[selectedSkills[0].index];
            oldCard.classList.remove('selected');
            selectedSkills.shift();
            selectedSkills.push({ index, name: skill.name, description: skill.description });
            card.classList.add('selected');
        }
    }
    
    updateSelectedSkillsList();
    updateConfirmButton();
}

// 선택된 스킬 목록 업데이트
function updateSelectedSkillsList() {
    selectedSkillsList.innerHTML = '';
    
    if (selectedSkills.length === 0) {
        selectedSkillsList.innerHTML = '<div class="selected-item empty">아직 선택된 스킬이 없습니다</div>';
    } else {
        selectedSkills.forEach(skill => {
            const item = document.createElement('div');
            item.className = 'selected-item';
            item.textContent = skill.name;
            selectedSkillsList.appendChild(item);
        });
    }
}

// 확인 버튼 활성화/비활성화
function updateConfirmButton() {
    confirmBtn.disabled = selectedSkills.length !== 2;
}

// 뒤로 가기
backBtn.addEventListener('click', () => {
    skillScreen.classList.remove('active');
    characterScreen.classList.add('active');
    selectedCharacter = null;
    selectedSkills = [];
    characterCards.forEach(c => c.classList.remove('selected'));
});

// 확인 (완료 화면으로)
confirmBtn.addEventListener('click', () => {
    showCompleteScreen();
});

// 완료 화면 표시
function showCompleteScreen() {
    const character = characters[selectedCharacter];
    document.getElementById('finalCharacterName').textContent = character.name;
    
    const finalSkillsDiv = document.getElementById('finalSkills');
    finalSkillsDiv.innerHTML = '';
    
    selectedSkills.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'final-skill';
        skillDiv.innerHTML = `
            <div class="skill-name">${skill.name}</div>
            <div class="skill-description">${skill.description}</div>
        `;
        finalSkillsDiv.appendChild(skillDiv);
    });
    
    skillScreen.classList.remove('active');
    completeScreen.classList.add('active');
}

// 처음부터 다시
restartBtn.addEventListener('click', () => {
    selectedCharacter = null;
    selectedSkills = [];
    characterCards.forEach(c => c.classList.remove('selected'));
    
    completeScreen.classList.remove('active');
    characterScreen.classList.add('active');
});
