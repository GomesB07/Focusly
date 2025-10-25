import EmojiPicker from "rn-emoji-picker"
import NewModal from "../NewModal/NewModal"
import { Emoji } from "rn-emoji-picker/dist/interfaces"
import {emojis} from "rn-emoji-picker/dist/data"
import { LogBox } from "react-native"

LogBox.ignoreLogs(["shared value's .value"])

type EmojiModalProps = {
    modalIconVisible: boolean;
    setModalIconVisible: (visible: boolean) => void;
    setSelectedEmoji: (emoji: Emoji) => void;
    setValue: (name: 'icon', value: string) => void;
}


const EmojiModal = ({modalIconVisible, setModalIconVisible, setSelectedEmoji, setValue}: EmojiModalProps) => {

    const selectEmojiAndCloseModal = (emoji: Emoji) => {
        setSelectedEmoji(emoji)
        setValue('icon', emoji.emoji)
        setModalIconVisible(false)
    }


    return (
        <NewModal 
            visible={modalIconVisible}
            setVisible={setModalIconVisible}
            content={
                <EmojiPicker
                        emojis={emojis}
                        autoFocus={false}
                        loading={false}
                        darkMode={false}
                        perLine={7}
                        onSelect={emoji => selectEmojiAndCloseModal(emoji)}
                    />
            }
        />
    )
}

export default EmojiModal