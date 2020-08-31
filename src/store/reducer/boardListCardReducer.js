export default function boardListCardReducer (state ={
    cards: []
}, action) {
    switch (action.type) {
        // 获取全部卡片
        case "GET_BOARD_LIST_CARD_ALL":
            return {
                cards: [...state.cards, ...action.cards]
            }

        // 添加卡片
        case "ADD_BOARD_LIST_CARD":
            return {
                cards: [...state.cards, action.card]
            }

        // 更新卡片标题
        case 'UPDATE_BOARD_LIST_CARD_TITLE':

            let titleIndex = state.cards.findIndex(item => item.id == action.cardId);

            state.cards[titleIndex].name = action.newCardName;

            return {
                cards: [...state.cards]
            }

        // 更新卡片描述
        case 'UPDATE_BOARD_LIST_CARD_DES':

            let desIndex = state.cards.findIndex(item => item.id == action.cardId);

            state.cards[desIndex].description = action.newCardDes;

            return {
                cards: [...state.cards]
            }

        // 添加卡片的附件
        case 'UPDATE_BOARD_LIST_CARD_ATTACHMENT':

            state.cards = state.cards.map(card => {
                
                if (card.id == action.boardListCardId) {
                    return {
                        ...card,
                        attachments: [...card.attachments, action.newAtt]
                    }
                }
                return card;
            })
            
            return {
                cards: [...state.cards]
            }
        
        // 删除卡片附件
        case 'REMOVE_BOARD_LIST_CARD_ATTACHMENT':

            state.cards = state.cards.map(card => {

                if (card.id == action.boardListCardId) {
                    return {
                        ...card,
                        attachments: card.attachments.filter( item => item.id != action.cardAttachmentId )
                    }
                }
                return card;
            })

            return {
                cards: [...state.cards]
            }

        // 设置卡片的封面
        case 'SET_BOARD_LIST_CARD_COVER':
            state.cards = state.cards.map(card => {
                if ( card.id == action.boardListCardId) {
                    return {
                        ...card,
                        coverPath: action.imgPath,
                        attachments: card.attachments.map(att => {
                            return {
                                ...att,
                                isCover: att.id == action.attachmentId,
                            }
                        })             
                    }
                }
                return card;
            })
            return {
                cards: [...state.cards]
            }

        // 取消卡片的封面
        case "REMOVE_BOARD_LIST_CARD_COVER":
            state.cards = state.cards.map(card => {
                if ( card.id == action.boardListCardId) {
                    return {
                        ...card,
                        coverPath: "",
                        attachments: card.attachments.map(att => {
                            return {
                                ...att,
                                isCover: false,
                            }
                        })             
                    }
                }
                return card;
            })
            return {
                cards: [...state.cards]
            }
            
        // 增加评论数
        case "ADD_COMMENT_COUNT":

            let index = state.cards.findIndex( item => item.id == action.newCommentId)
            state.cards[index].commentCount++;
            
            return {
                cards: [...state.cards]
            };
    }
    return state;
}