### **Singleton e Multiton**

---

### **O que é Singleton?**

O **Singleton** é um padrão de projeto criacional que garante:  
1. Que uma classe tenha **apenas uma única instância** durante a execução do programa.  
2. Um **ponto de acesso global** a essa instância.  

#### **Quando usar?**
- Para gerenciar recursos compartilhados, como conexões de banco de dados, configuração global ou registradores de logs.  
- Quando criar múltiplas instâncias de uma classe seria redundante ou problemático.

#### **Exemplo de Código em Java: Singleton**

```java
public class Singleton {
    // Instância única, criada de forma preguiçosa
    private static Singleton instance;

    // Construtor privado impede criação externa
    private Singleton() {
        System.out.println("Instância Singleton criada!");
    }

    // Método público para obter a única instância
    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }

    public void showMessage() {
        System.out.println("Olá do Singleton!");
    }
}
```

#### **Uso:**
```java
public class Main {
    public static void main(String[] args) {
        Singleton s1 = Singleton.getInstance();
        Singleton s2 = Singleton.getInstance();

        s1.showMessage();

        // Verifica se ambas as instâncias são iguais
        System.out.println(s1 == s2); // true
    }
}
```

---

### **O que é Multiton?**

O **Multiton** é uma variação do Singleton que permite a existência de **múltiplas instâncias controladas**, identificadas por **chaves específicas**. Para cada chave, existe **uma instância única** associada.

#### **Quando usar?**
- Quando há a necessidade de gerenciar várias instâncias relacionadas por contexto, como:
  - Conexões a diferentes bancos de dados.
  - Configurações específicas para diferentes ambientes.

#### **Exemplos de Códigos em Java: Multiton**

##### Exemplo 1

```java
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
}
```

#### **Uso:**
```java
public class Main {
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
```
#### Exemplo 2 - ENUM

 - Tendo em vista que, o Enum é imutavel (em java) ele se enquadra como outro exemplo do padrão Multiton, uma vez que, cada constante de enum é, na prática, uma instância estática e única da própria classe. As instancias de enuns são estabelecidas em tempo de execução.

```Java

```
---

### **Diferenças Entre Singleton e Multiton**

| Característica              | Singleton                               | Multiton                                    |
|-----------------------------|-----------------------------------------|--------------------------------------------|
| Número de Instâncias        | Apenas uma instância para toda a aplicação. | Uma instância única por **chave específica**. |
| Identificação               | Não há chave, é sempre a mesma instância. | Identificado por uma chave (ex.: nome ou ID). |
| Exemplo de uso              | Configuração global, log.               | Conexões a diferentes bancos, ambientes.   |
| Escopo                     | Global (uma instância única).            | Contextual (uma instância por chave).      |

---

### **Multiton no GoF**

O padrão **Multiton** **não faz parte dos 23 padrões de projeto descritos no livro "Design Patterns: Elements of Reusable Object-Oriented Software" (GoF)**.  
**Motivo:**  
1. O GoF foca em padrões amplamente reconhecidos até a década de 90, e o Multiton surgiu como uma **extensão mais recente** do Singleton.  
2. O Multiton é frequentemente considerado uma **especialização do Singleton**, e não um padrão separado.

---

### **Resumo**

- **Singleton**: Use para garantir uma única instância compartilhada por toda a aplicação.  
- **Multiton**: Use quando precisar de múltiplas instâncias identificadas por chaves, mas mantendo o controle sobre cada instância única.
