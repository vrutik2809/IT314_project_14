// Mock console.log and console.debug to prevent them from printing to the console during tests
jest.spyOn(global.console, 'log').mockImplementation(jest.fn())
jest.spyOn(global.console, 'debug').mockImplementation(jest.fn())