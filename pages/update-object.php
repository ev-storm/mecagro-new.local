<?php

header('Content-Type: application/json');

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!isset($data['cod'])) {
    echo json_encode(['success' => false, 'message' => 'Код объекта не указан.']);
    exit;
}

$cod = $data['cod'];
$objectsFile = '../js/object.json';

if (!file_exists($objectsFile)) {
    echo json_encode(['success' => false, 'message' => 'Файл объектов не найден.']);
    exit;
}

$fileContents = file_get_contents($objectsFile);
if ($fileContents === false) {
    echo json_encode(['success' => false, 'message' => 'Не удалось прочитать файл данных.']);
    exit;
}

$dataArr = json_decode($fileContents, true);
if (!is_array($dataArr)) {
    echo json_encode(['success' => false, 'message' => 'Ошибка декодирования JSON.']);
    exit;
}

// Функция для обновления объекта по коду
function updateObject(&$categories, $cod, $newData) {
    foreach ($categories as &$category) {
        if (isset($category['subCategories'])) {
            foreach ($category['subCategories'] as &$subCategory) {
                if (isset($subCategory['object'])) {
                    foreach ($subCategory['object'] as &$obj) {
                        if (isset($obj['cod']) && $obj['cod'] === $cod) {
                            // Обновляем данные объекта
                            $obj['name'] = $newData['name'];
                            $obj['title'] = $newData['title'];
                            $obj['specifications'] = $newData['specifications'];
                            $obj['filter'] = $newData['filter'];
                            return true; // Объект обновлен
                        }
                    }
                }
            }
        }
    }
    return false; // Объект не найден
}

// Проверим структуру и выполним обновление
$lang = 'ru';
if (isset($dataArr[0]['categories'][$lang])) {
    $updated = updateObject($dataArr[0]['categories'][$lang], $cod, $data);
} else {
    $updated = false;
}

if ($updated) {
    if (file_put_contents($objectsFile, json_encode($dataArr, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)) === false) {
        echo json_encode(['success' => false, 'message' => 'Ошибка записи файла.']);
    } else {
        echo json_encode(['success' => true]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Объект не найден.']);
}
exit;
