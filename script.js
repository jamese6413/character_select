// 캐릭터 데이터
const characters = [
    {
        name: '전사',
        icon: '🗡️',
        description: '강력한 공격력과 방어력',
        skills: [
            { name: '강타', description: '적에게 강력한 타격을 가한다' },
            { name: '방패 방어', description: '방어력을 크게 증가시킨다' },
            { name: '전투 울음', description: '모든 능력치를 상승시킨다' },
            { name: '최후의 일격', description: '체력이 낮을수록 더 큰 데미지를 준다' }
        ]
    },
    {
        name: '마법사',
        icon: '🧙',
        description: '강력한 마법 능력',
        skills: [
            { name: '파이어볼', description: '넓은 범위에 불 마법을 시전한다' },
            { name: '얼음창', description: '적을 얼려서 움직임을 봉쇄한다' },
            { name: '마나 방패', description: '마나를 소모하여 피해를 흡수한다' },
            { name: '시간 왜곡', description: '모든 적의 움직임을 느리게 만든다' }
        ]
    },
    {
        name: '궁수',
        icon: '🏹',
        description: '빠른 속도와 정확성',
        skills: [
            { name: '다중 화살', description: '여러 개의 화살을 동시에 발사한다' },
            { name: '정확한 조준', description: '크리티컬 확률을 크게 증가시킨다' },
            { name: '폭발 화살', description: '화살이 폭발하여 범위 피해를 준다' },
            { name: '연속 사격', description: '매우 빠른 속도로 화살을 발사한다' }
        ]
    },
    {
        name: '암살자',
        icon: '🥷',
        description: '높은 크리티컬 확률',
        skills: [
            { name: '암습', description: '적 뒤에서 나타나 강력한 일격을 가한다' },
            { name: '독 칠하기', description: '무기에 독을 칠해 지속 피해를 준다' },
            { name: '회피', description: '다음 피해를 완벽히 회피한다' },
            { name: '그림자 이동', description: '어둠 속으로 순간이동한다' }
        ]
    },
    {
        name: '팔라딘',
        icon: '🛡️',
        description: '방어와 치유 능력',
        skills: [
            { name: '신의 보호', description: '모든 아군을 보호하는 결계를 만든다' },
            { name: '회복 기도', description: '모든 아군의 체력을 회복시킨다' },
            { name: '심판', description: '악의 힘으로 적을 벌한다' },
            { name: '신성한 방패', description: '방어력을 극도로 증가시킨다' }
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
