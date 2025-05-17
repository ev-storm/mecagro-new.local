<?php

header('Content-Type: application/json');

// Отключить вывод ошибок в поток
error_reporting(E_ALL);
ini_set('display_errors', 1);


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

// Рекурсивная функция удаления объекта по коду
function recursiveDeleteObject(&$categories, $cod) {
    $found = false;
    foreach ($categories as &$category) {
        if (isset($category['subCategories'])) {
            foreach ($category['subCategories'] as &$subCategory) {
                if (isset($subCategory['object'])) {
                    foreach ($subCategory['object'] as $key => $obj) {
                        if (isset($obj['cod']) && $obj['cod'] === $cod) {
                            unset($subCategory['object'][$key]);
                            $found = true;
                        }
                    }
                    $subCategory['object'] = array_values($subCategory['object']);
                }
            }
        }
    }
    return $found;
}

// Проверим структуру и выполним удаление
$lang = 'ru';
if (isset($dataArr[0]['categories'][$lang])) {
    $found = recursiveDeleteObject($dataArr[0]['categories'][$lang], $cod);
} else {
    $found = false;
}

if ($found) {
    if (file_put_contents($objectsFile, json_encode($dataArr, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT)) === false) {
        echo json_encode(['success' => false, 'message' => 'Ошибка записи файла.']);
    } else {
        echo json_encode(['success' => true]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Объект не найден.']);
}
exit;