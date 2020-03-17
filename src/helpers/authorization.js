/**
 * Opcões que serão apresentadas quando clicar no botão de ações da tabela
 */
export const ACTION_RULES = {
    can_detail: 'can_detail',
    can_create: 'can_create',
    can_edit: 'can_edit',
    can_remove: 'can_remove',
    can_all: [
        'can_create',
        'can_edit',
        'can_remove',
    ],
    can_all_with_detail: [
        'can_detail',
        'can_create',
        'can_edit',
        'can_remove',
    ]
}