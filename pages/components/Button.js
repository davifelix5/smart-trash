import { styles } from './styles'
import { Text, TouchableOpacity } from 'react-native';


export default function Button({ style, children, ...props }) {
    return (
        <TouchableOpacity style={{...styles.button, ...style}} {...props}>
          <Text style={styles.buttonText}>
            {children}
          </Text>
        </TouchableOpacity>
    )
}