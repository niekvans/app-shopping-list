import { SwitchNavigator } from 'react-navigation';

import EditList from './src/screens/EditList';
import Loading from './src/screens/Loading';
import Login from './src/screens/Login';
import Main from './src/screens/Main';
import NewList from './src/screens/NewList';


const App = SwitchNavigator(
  {
    EditList,
    Loading,
    Login,
    Main,
    NewList
  },
  {
    initialRouteName: 'Loading'
  }
)

export default App;
