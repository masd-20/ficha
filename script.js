document.addEventListener('DOMContentLoaded', function() {
    // Cálculo automático de modificadores de habilidade
    const abilityScores = ['forca', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma'];
    abilityScores.forEach(ability => {
        const valorInput = document.getElementById(`${ability}-valor`);
        const modInput = document.getElementById(`${ability}-mod`);

        if (valorInput && modInput) { // Verifica se os elementos existem
            valorInput.addEventListener('input', function() {
                const valor = parseInt(valorInput.value);
                let modificador = Math.floor((valor - 10) / 2);
                modInput.value = isNaN(modificador) ? '' : modificador;
            });
        }
    });

    // Validação de HP
    const hpMaxInput = document.getElementById('pontos-vida-maximos');
    const hpAtualInput = document.getElementById('pontos-vida-atuais');

    if (hpAtualInput && hpMaxInput) {
        hpAtualInput.addEventListener('input', function() {
            const maxHp = parseInt(hpMaxInput.value) || 0;
            const currentHp = parseInt(hpAtualInput.value) || 0;
            if (currentHp > maxHp) {
                hpAtualInput.value = maxHp;
            }
        });
    }

    // Gerenciamento de espaços de magia
    const spellLevels = document.querySelectorAll('.spell-level');

    spellLevels.forEach(level => {
        const totalSlotsInput = level.querySelector('[id^="slots-total-"]');
        const expendedSlotsSpan = level.querySelector('[id^="slots-expended-"]');
        const checkboxes = level.querySelectorAll('.spells-list input[type="checkbox"]');

        function updateExpendedSlots() {
            const expended = Array.from(checkboxes).filter(cb => cb.checked).length;
            if (expendedSlotsSpan) {
                expendedSlotsSpan.textContent = `${expended} Gasto(s)`;
            }
        }

        if (totalSlotsInput) {
            totalSlotsInput.addEventListener('input', function() {
                updateExpendedSlots(); // Recalcula ao mudar o total
            });
        }
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateExpendedSlots);
        });
    });

    // Cálculo de CD e bônus de ataque de magia
    const spellAbilitySelect = document.getElementById('spellcasting-ability');
    const proficiencyBonusInput = document.getElementById('bonus-proficiencia');
    const spellSaveDcInput = document.getElementById('spell-save-dc');
    const spellAttackBonusInput = document.getElementById('spell-attack-bonus');
    const abilityModifierOutputs = {
        inteligencia: document.getElementById('inteligencia-mod'),
        sabedoria: document.getElementById('sabedoria-mod'),
        carisma: document.getElementById('carisma-mod')
    };

    function calculateSpellDCsAndBonuses() {
        const proficiencyBonus = parseInt(proficiencyBonusInput.value) || 0;
        const spellAbility = spellAbilitySelect.value;
        const abilityModifierOutput = abilityModifierOutputs[spellAbility];
        const abilityModifier = parseInt(abilityModifierOutput.value) || 0;

        if (spellSaveDcInput) {
            spellSaveDcInput.value = 8 + proficiencyBonus + abilityModifier;
        }
        if (spellAttackBonusInput) {
            spellAttackBonusInput.value = proficiencyBonus + abilityModifier;
        }
    }

    if (spellAbilitySelect && proficiencyBonusInput) {
        spellAbilitySelect.addEventListener('change', calculateSpellDCsAndBonuses);
        proficiencyBonusInput.addEventListener('input', calculateSpellDCsAndBonuses);
        for (const ability in abilityModifierOutputs) {
            const modInput = abilityModifierOutputs[ability];
            if (modInput) {
                modInput.addEventListener('input', calculateSpellDCsAndBonuses);
            }
        }
    }

    // Cálculo de bônus de ataque de arma
    const attacksTableBody = document.getElementById('attacks-table-body');
    const addAttackRowButton = document.getElementById('add-attack-row');
    const strengthModInput = document.getElementById('forca-mod');
    const dexterityModInput = document.getElementById('destreza-mod');

    function updateAttackBonus(row) {
        const abilitySelect = row.querySelector('.attack-ability');
        const attackBonusInput = row.querySelector('.attack-bonus');
        let abilityModifier = 0;

        if (abilitySelect.value === 'forca') {
            abilityModifier = parseInt(strengthModInput.value) || 0;
        } else if (abilitySelect.value === 'destreza') {
            abilityModifier = parseInt(dexterityModInput.value) || 0;
        }

        if (attackBonusInput) {
            attackBonusInput.value = abilityModifier >= 0 ? `+${abilityModifier}` : `${abilityModifier}`;
        }
    }

    if (attacksTableBody) {
        attacksTableBody.addEventListener('input', function(event) {
            const target = event.target;
            if (target.classList.contains('attack-ability')) {
                const row = target.closest('tr');
                updateAttackBonus(row);
            }
        });
    }

    if (proficiencyBonusInput && strengthModInput && dexterityModInput && attacksTableBody) {
        proficiencyBonusInput.addEventListener('input', function() {
            const rows = attacksTableBody.querySelectorAll('tr');
            rows.forEach(updateAttackBonus);
        });

        strengthModInput.addEventListener('input', function() {
            const rows = attacksTableBody.querySelectorAll('tr');
            rows.forEach(updateAttackBonus);
        });

        dexterityModInput.addEventListener('input', function() {
            const rows = attacksTableBody.querySelectorAll('tr');
            rows.forEach(updateAttackBonus);
        });
    }

    if (addAttackRowButton && attacksTableBody) {
        addAttackRowButton.addEventListener('click', function() {
            const newRow = attacksTableBody.insertRow();
            newRow.innerHTML = `
                <td><input type="text" class="attack-name"></td>
                <td><input type="text" class="attack-bonus" readonly></td>
                <td><input type="text" class="attack-damage"></td>
                <td>
                    <select class="attack-ability">
                        <option value="forca">Força</option>
                        <option value="destreza">Destreza</option>
                    </select>
                </td>
            `;
            const newAbilitySelect = newRow.querySelector('.attack-ability');
            if (newAbilitySelect) {
                newAbilitySelect.addEventListener('change', function() {
                    updateAttackBonus(newRow);
                });
            }
            updateAttackBonus(newRow);
        });
    }
});