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
let currentRound = 1; // 현재 라운드 (1, 2, 3)
let selectedCharacter = null;
let currentSkills = []; // 현재 라운드 스킬
let finalSelection = []; // 최종 선택 (3개 캐릭터 + 스킬)

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
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');
const skillProgressText = document.getElementById('skillProgressText');
const skillProgressFill = document.getElementById('skillProgressFill');

// 진행 상황 업데이트
function updateProgress() {
    const percentage = (currentRound / 3) * 100;
    progressFill.style.width = percentage + '%';
    progressText.textContent = `캐릭터 ${currentRound}/3 선택`;
}

// 스킬 진행 상황 업데이트
function updateSkillProgress() {
    const percentage = (currentRound / 3) * 100;
    skillProgressFill.style.width = percentage + '%';
    skillProgressText.textContent = `스킬 선택 ${currentRound}/3`;
}

// 초기 진행 상황 설정
updateProgress();

// 캐릭터 선택 이벤트
characterCards.forEach(card => {
    card.addEventListener('click', () => {
        // 이전 선택 제거
        characterCards.forEach(c => c.classList.remove('selected'));
        
        // 새로운 선택 추가
        card.classList.add('selected');
        selectedCharacter = parseInt(card.dataset.character);
        currentSkills = [];
        
        // 스킬 화면으로 전환
        showSkillScreen();
    });
});

// 스킬 선택 화면 표시
function showSkillScreen() {
    const character = characters[selectedCharacter];
    document.getElementById('selectedCharacterName').textContent = character.name;
    
    updateSkillProgress();
    
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
    const skillIndex = currentSkills.findIndex(s => s.index === index);
    
    if (skillIndex > -1) {
        // 이미 선택된 스킬 해제
        currentSkills.splice(skillIndex, 1);
        card.classList.remove('selected');
    } else {
        // 새로운 스킬 선택
        if (currentSkills.length < 2) {
            currentSkills.push({ index, name: skill.name, description: skill.description });
            card.classList.add('selected');
        } else {
            // 2개가 이미 선택되었으면 첫 번째 스킬 제거
            const oldCard = skillsGrid.children[currentSkills[0].index];
            oldCard.classList.remove('selected');
            currentSkills.shift();
            currentSkills.push({ index, name: skill.name, description: skill.description });
            card.classList.add('selected');
        }
    }
    
    updateSelectedSkillsList();
    updateConfirmButton();
}

// 선택된 스킬 목록 업데이트
function updateSelectedSkillsList() {
    selectedSkillsList.innerHTML = '';
    
    if (currentSkills.length === 0) {
        selectedSkillsList.innerHTML = '<div class="selected-item empty">아직 선택된 스킬이 없습니다</div>';
    } else {
        currentSkills.forEach(skill => {
            const item = document.createElement('div');
            item.className = 'selected-item';
            item.textContent = skill.name;
            selectedSkillsList.appendChild(item);
        });
    }
}

// 확인 버튼 활성화/비활성화
function updateConfirmButton() {
    confirmBtn.disabled = currentSkills.length !== 2;
}

// 뒤로 가기
backBtn.addEventListener('click', () => {
    skillScreen.classList.remove('active');
    characterScreen.classList.add('active');
    selectedCharacter = null;
    currentSkills = [];
    characterCards.forEach(c => c.classList.remove('selected'));
});

// 확인 (다음 라운드로)
confirmBtn.addEventListener('click', () => {
    const character = characters[selectedCharacter];
    
    // 현재 선택 저장
    finalSelection.push({
        character: character.name,
        icon: character.icon,
        skills: [...currentSkills]
    });
    
    // 다음 라운드 진행
    if (currentRound < 3) {
        currentRound++;
        selectedCharacter = null;
        currentSkills = [];
        characterCards.forEach(c => c.classList.remove('selected'));
        updateProgress();
        
        skillScreen.classList.remove('active');
        characterScreen.classList.add('active');
    } else {
        // 모든 라운드 완료 - 완료 화면으로
        showCompleteScreen();
    }
});

// 완료 화면 표시
function showCompleteScreen() {
    const finalSelectionDiv = document.getElementById('finalSelection');
    finalSelectionDiv.innerHTML = '';
    
    finalSelection.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'final-item';
        itemDiv.innerHTML = `
            <div class="final-item-header">
                <span class="final-item-icon">${item.icon}</span>
                <h2>${item.character}</h2>
            </div>
            <div class="final-item-skills">
                ${item.skills.map(skill => `
                    <div class="final-skill">
                        <div class="skill-name">${skill.name}</div>
                        <div class="skill-description">${skill.description}</div>
                    </div>
                `).join('')}
            </div>
        `;
        finalSelectionDiv.appendChild(itemDiv);
    });
    
    skillScreen.classList.remove('active');
    completeScreen.classList.add('active');
}

// 처음부터 다시
restartBtn.addEventListener('click', () => {
    currentRound = 1;
    selectedCharacter = null;
    currentSkills = [];
    finalSelection = [];
    characterCards.forEach(c => c.classList.remove('selected'));
    updateProgress();
    
    completeScreen.classList.remove('active');
    characterScreen.classList.add('active');
});
