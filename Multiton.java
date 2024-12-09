import java.util.HashMap;
import java.util.Map;

public class Multiton {
    // Armazena instâncias únicas por chave
    private static final Map<String, Multiton> instances = new HashMap<>();

    private String name;

    // Construtor privado
    private Multiton(String name) {
        this.name = name;
        System.out.println("Instância Multiton criada: " + name);
    }

    // Método público para obter a instância por chave
    public static synchronized Multiton getInstance(String key) {
        if (!instances.containsKey(key)) {
            instances.put(key, new Multiton(key));
        }
        return instances.get(key);
    }

    public void showName() {
        System.out.println("Instância: " + name);
    }

    public static void main(String[] args) {
        Multiton m1 = Multiton.getInstance("DB1");
        Multiton m2 = Multiton.getInstance("DB2");
        Multiton m3 = Multiton.getInstance("DB1"); // Reutiliza a instância de "DB1"

        m1.showName(); // Instância: DB1
        m2.showName(); // Instância: DB2

        // Verifica se as instâncias são iguais para a mesma chave
        System.out.println(m1 == m3); // true
    }

}
