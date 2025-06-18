package io.github.m1ddler.my_pet_project;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;

//public class UserServiceImplTest {
//    @Mock
//    private UserRepository userRepository;
//    private UserServiceImpl userService;
//    private AutoCloseable closeable;
//
//    @BeforeEach
//    void setup() {
//        closeable = MockitoAnnotations.openMocks(this);
//        userService = new UserServiceImpl(userRepository);
//    }
//
//    @AfterEach
//    void tearDown() throws Exception {
//        closeable.close();
//    }
//
//    @Test
//    void getAllUsers_shouldReturnListOfUserDTOs() {
//        User user = new User("John", "john@example.com");
//        user.setId(1);
//        when(userRepository.findAll()).thenReturn(List.of(user));
//
//        ResponseEntity<List<UserDTO>> response = userService.getAllUsers();
//        List<UserDTO> result = response.getBody();
//
//        assertNotNull(result);
//        assertEquals(1, result.size());
//        assertEquals("John", result.get(0).getUsername());
//    }
//
//    @Test
//    void getUserById_whenUserExists_shouldReturnUserDTO() {
//        User user = new User("Alice", "alice@example.com");
//        user.setId(2);
//        when(userRepository.findById(2)).thenReturn(Optional.of(user));
//
//        ResponseEntity<UserDTO> response = userService.getUserById(2);
//        UserDTO dto = response.getBody();
//
//        assertNotNull(dto);
//        assertEquals("Alice", dto.getUsername());
//    }
//
//    @Test
//    void getUserById_whenUserNotFound_shouldThrowException() {
//        when(userRepository.findById(99)).thenReturn(Optional.empty());
//        assertThrows(ResponseStatusException.class, () -> userService.getUserById(99));
//    }
//
//    @Test
//    void saveUser_whenEmailNotExists_shouldSaveAndReturnDTO() {
//        UserDTO dto = new UserDTO(0, "Bob", "bob@example.com", List.of());
//        User saved = new User("Bob", "bob@example.com");
//        saved.setId(10);
//
//        when(userRepository.existsUserByEmail("bob@example.com")).thenReturn(false);
//        when(userRepository.save(any(User.class))).thenReturn(saved);
//
//        ResponseEntity<UserDTO> response = userService.saveUser(dto);
//        UserDTO result = response.getBody();
//
//        assertNotNull(result);
//        assertEquals(10, result.getId());
//        verify(userRepository).save(any(User.class));
//    }
//
//    @Test
//    void saveUser_whenEmailExists_shouldThrowException() {
//        UserDTO dto = new UserDTO(0, "Tom", "tom@example.com", List.of());
//        when(userRepository.existsUserByEmail("tom@example.com")).thenReturn(true);
//        assertThrows(EmailAlreadyExistsException.class, () -> userService.saveUser(dto));
//    }
//
//    @Test
//    void deleteUser_whenUserExists_shouldDelete() {
//        when(userRepository.existsById(1)).thenReturn(true);
//        userService.deleteUser(1);
//        verify(userRepository).deleteById(1);
//    }
//
//    @Test
//    void deleteUser_whenUserNotExists_shouldThrowException() {
//        when(userRepository.existsById(100)).thenReturn(false);
//        assertThrows(ResponseStatusException.class, () -> userService.deleteUser(100));
//    }
//}
