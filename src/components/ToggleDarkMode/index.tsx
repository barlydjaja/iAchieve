import { Button } from 'components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsDarkMode, setIsDarkMode } from 'redux/reducers/darkMode';

const ToggleDarkMode = () => {
  const isDarkMode = useSelector(selectIsDarkMode);
  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Button
      className="rounded-full p-2 fixed bottom-4 right-4 z-50 cursor-pointer"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
    </Button>
  );
};

export default ToggleDarkMode;
